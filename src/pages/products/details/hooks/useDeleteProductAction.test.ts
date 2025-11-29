import { act, renderHook } from '@testing-library/react'
import { useLocation, useParams } from 'react-router-dom'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockProduct1 } from '@/features/products/api/__mocks__/productsApi'
import {
    useDeleteProductByIdMutation,
    useGetProductByIdQuery,
} from '@/features/products/api/productsApi'
import { ROUTES } from '@/shared/config/routes'
import { mockError } from '@/tests/mocks'
import { mockLocation, mockNavigate } from '@/tests/mocks/router'
import { useDeleteProductAction } from './useDeleteProductAction'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/products/hooks/pdf/usePDFExport')
vi.mock('@/features/products/api/productsApi')
vi.mock('@/features/products/utils/pdf/generatePdfFilename')
vi.mock('@/shared/components/common/spinner-button/SpinnerButton')

describe('useDeleteProductAction', () => {
    const mockDeleteProductById = vi.fn()
    const mockDeleteUnwrap = vi.fn()

    vi.mocked(useLocation).mockReturnValue({
        ...mockLocation,
        pathname: ROUTES.backstage.products.details('123456789012345678901234'),
    })

    beforeEach(() => {
        vi.mocked(useDeleteProductByIdMutation as Mock).mockReturnValue([
            mockDeleteProductById,
            { isLoading: false },
        ])

        mockDeleteProductById.mockReturnValue({ unwrap: mockDeleteUnwrap })

        vi.mocked(useGetProductByIdQuery as Mock).mockReturnValue({
            data: mockProduct1,
            isLoading: false,
            error: null,
        })
    })

    it('handles delete action', async () => {
        const { result } = renderHook(() => useDeleteProductAction())

        let deleteAction = result.current

        act(() => {
            deleteAction?.onClick()
        })

        deleteAction = result.current
        const { onConfirm } = deleteAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDeleteUnwrap).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith(
            ROUTES.backstage.products.category(mockProduct1.category?.name!)
        )
    })

    it('shows error toast if delete fails', async () => {
        mockDeleteUnwrap.mockRejectedValue(mockError)

        const { result } = renderHook(() => useDeleteProductAction())

        let deleteAction = result.current

        act(() => {
            deleteAction?.onClick()
        })

        deleteAction = result.current
        const { onConfirm } = deleteAction?.modalProps || {}

        act(() => {
            onConfirm?.()
        })

        expect(mockDeleteProductById).toHaveBeenCalledWith('123')
    })

    it('returns null if no id is provided', () => {
        vi.mocked(useParams).mockReturnValue({})
        const { result } = renderHook(() => useDeleteProductAction())
        expect(result.current).toEqual(null)
    })
})
