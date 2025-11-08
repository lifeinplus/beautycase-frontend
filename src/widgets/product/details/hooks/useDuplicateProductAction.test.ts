import { act, renderHook } from '@testing-library/react'
import { useLocation, useParams } from 'react-router-dom'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockProduct1 } from '@/features/products/api/__mocks__/productsApi'
import {
    useDuplicateProductByIdMutation,
    useGetProductByIdQuery,
} from '@/features/products/api/productsApi'
import { ROUTES } from '@/shared/config/routes'
import { mockError } from '@/tests/mocks'
import { mockLocation } from '@/tests/mocks/router'
import { useDuplicateProductAction } from './useDuplicateProductAction'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/products/api/productsApi')

describe('useDuplicateProductAction', () => {
    const mockDuplicate = vi.fn()
    const mockDuplicateUnwrap = vi.fn()

    vi.mocked(useLocation).mockReturnValue({
        ...mockLocation,
        pathname: ROUTES.backstage.products.details('123456789012345678901234'),
    })

    beforeEach(() => {
        vi.mocked(useGetProductByIdQuery as Mock).mockReturnValue({
            data: mockProduct1,
            isLoading: false,
            error: null,
        })

        vi.mocked(useDuplicateProductByIdMutation as Mock).mockReturnValue([
            mockDuplicate,
            { isLoading: false },
        ])

        mockDuplicate.mockReturnValue({ unwrap: mockDuplicateUnwrap })
    })

    it('handles duplicate action', async () => {
        const { result } = renderHook(() => useDuplicateProductAction())

        let duplicateAction = result.current

        act(() => {
            duplicateAction?.onClick()
        })

        duplicateAction = result.current
        const { onConfirm } = duplicateAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDuplicateUnwrap).toHaveBeenCalled()
    })

    it('shows error toast if duplicate fails', async () => {
        mockDuplicateUnwrap.mockRejectedValue(mockError)

        const { result } = renderHook(() => useDuplicateProductAction())

        let duplicateAction = result.current

        act(() => {
            duplicateAction?.onClick()
        })

        duplicateAction = result.current
        const { onConfirm } = duplicateAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDuplicate).toHaveBeenCalledWith('123')
    })

    it('returns null if no id is provided', () => {
        vi.mocked(useParams).mockReturnValue({})
        const { result } = renderHook(() => useDuplicateProductAction())
        expect(result.current).toEqual(null)
    })
})
