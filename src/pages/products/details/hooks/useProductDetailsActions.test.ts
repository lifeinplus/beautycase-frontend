import { act, renderHook } from '@testing-library/react'
import toast from 'react-hot-toast'
import { useLocation, useParams } from 'react-router-dom'
import {
    afterAll,
    beforeAll,
    beforeEach,
    describe,
    expect,
    it,
    Mock,
    vi,
} from 'vitest'

import { mockProduct1 } from '@/features/products/api/__mocks__/productsApi'
import {
    useDeleteProductByIdMutation,
    useGetProductByIdQuery,
} from '@/features/products/api/productsApi'
import { mockError } from '@/shared/utils/error/__mocks__/getErrorMessage'
import { mockLocation, mockNavigate } from '@/tests/mocks/router'
import { useProductDetailsActions } from './useProductDetailsActions'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/products/api/productsApi')
vi.mock('@/shared/utils/error/getErrorMessage')

describe('useProductDetailsActions', () => {
    const mockDeleteProductById = vi.fn()
    const mockDeleteUnwrap = vi.fn()

    const spyConsoleError = vi.spyOn(console, 'error')

    vi.mocked(useLocation).mockReturnValue({
        ...mockLocation,
        pathname: '/products/123456789012345678901234',
    })

    beforeAll(() => {
        spyConsoleError.mockImplementation(() => {})
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

    afterAll(() => {
        spyConsoleError.mockRestore()
    })

    it('returns correct number of actions', () => {
        const { result } = renderHook(() => useProductDetailsActions())
        expect(result.current).toHaveLength(3)
    })

    it('handles delete action', async () => {
        const { result } = renderHook(() => useProductDetailsActions())

        const deleteAction = result.current.find(
            (action) => action.key === 'delete'
        )

        const { onConfirm } = deleteAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDeleteUnwrap).toHaveBeenCalled()
    })

    it('shows error toast if delete fails', async () => {
        mockDeleteUnwrap.mockRejectedValue(mockError)

        const { result } = renderHook(() => useProductDetailsActions())

        const deleteAction = result.current.find(
            (action) => action.key === 'delete'
        )

        const { onConfirm } = deleteAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDeleteProductById).toHaveBeenCalledWith('123')
        expect(toast.error).toHaveBeenCalledWith(mockError.message)
    })

    it('handles back action', async () => {
        const { result } = renderHook(() => useProductDetailsActions())

        const backAction = result.current.find(
            (action) => action.key === 'back'
        )

        expect(backAction).toBeDefined()

        await act(async () => {
            await backAction!.onClick()
        })

        expect(mockNavigate).toHaveBeenCalledWith('/products', {
            replace: true,
            state: { scrollId: '123' },
        })
    })

    it('returns empty array if no id is provided', () => {
        vi.mocked(useParams).mockReturnValue({})
        const { result } = renderHook(() => useProductDetailsActions())
        expect(result.current).toEqual([])
    })
})
