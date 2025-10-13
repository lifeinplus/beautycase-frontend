import { act, renderHook } from '@testing-library/react'
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
    useDuplicateProductByIdMutation,
    useGetProductByIdQuery,
} from '@/features/products/api/productsApi'
import { mockError } from '@/tests/mocks'
import { mockLocation, mockNavigate } from '@/tests/mocks/router'
import { useProductDetailsActions } from './useProductDetailsActions'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/products/api/productsApi')

describe('useProductDetailsActions', () => {
    const mockDelete = vi.fn()
    const mockDeleteUnwrap = vi.fn()
    const mockDuplicate = vi.fn()
    const mockDuplicateUnwrap = vi.fn()

    const mockFromPathname = '/products/category/category-1'

    const spyConsoleError = vi.spyOn(console, 'error')

    vi.mocked(useLocation).mockReturnValue({
        ...mockLocation,
        pathname: '/products/123456789012345678901234',
    })

    beforeAll(() => {
        spyConsoleError.mockImplementation(() => {})
    })

    beforeEach(() => {
        vi.mocked(useGetProductByIdQuery as Mock).mockReturnValue({
            data: mockProduct1,
            isLoading: false,
            error: null,
        })

        vi.mocked(useDeleteProductByIdMutation as Mock).mockReturnValue([
            mockDelete,
            { isLoading: false },
        ])

        mockDelete.mockReturnValue({ unwrap: mockDeleteUnwrap })

        vi.mocked(useDuplicateProductByIdMutation as Mock).mockReturnValue([
            mockDuplicate,
            { isLoading: false },
        ])

        mockDuplicate.mockReturnValue({ unwrap: mockDuplicateUnwrap })
    })

    afterAll(() => {
        spyConsoleError.mockRestore()
    })

    it('returns correct number of actions', () => {
        const { result } = renderHook(() => useProductDetailsActions())
        expect(result.current).toHaveLength(4)
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

        expect(mockNavigate).toHaveBeenCalledWith(mockFromPathname, {
            replace: true,
            state: { scrollId: '123' },
        })
    })

    it('handles duplicate action', async () => {
        const { result } = renderHook(() => useProductDetailsActions())

        let duplicateAction = result.current.find((a) => a.key === 'duplicate')

        act(() => {
            duplicateAction?.onClick()
        })

        duplicateAction = result.current.find((a) => a.key === 'duplicate')
        const { onConfirm } = duplicateAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDuplicateUnwrap).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith(mockFromPathname)
    })

    it('shows error toast if duplicate fails', async () => {
        mockDuplicateUnwrap.mockRejectedValue(mockError)

        const { result } = renderHook(() => useProductDetailsActions())

        let duplicateAction = result.current.find(
            (action) => action.key === 'duplicate'
        )

        act(() => {
            duplicateAction?.onClick()
        })

        duplicateAction = result.current.find((a) => a.key === 'duplicate')
        const { onConfirm } = duplicateAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDuplicate).toHaveBeenCalledWith('123')
    })

    it('handles delete action', async () => {
        const { result } = renderHook(() => useProductDetailsActions())

        let deleteAction = result.current.find((a) => a.key === 'delete')

        act(() => {
            deleteAction?.onClick()
        })

        deleteAction = result.current.find((a) => a.key === 'delete')
        const { onConfirm } = deleteAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDeleteUnwrap).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith(mockFromPathname)
    })

    it('closes modal when cancel is called', async () => {
        const { result } = renderHook(() => useProductDetailsActions())

        let deleteAction = result.current.find((a) => a.key === 'delete')

        await act(async () => {
            await deleteAction?.onClick()
        })

        deleteAction = result.current.find((a) => a.key === 'delete')
        const { onCancel } = deleteAction?.modalProps || {}

        await act(async () => {
            await onCancel?.()
        })

        const updatedDeleteAction = result.current.find(
            (a) => a.key === 'delete'
        )
        expect(updatedDeleteAction?.modalProps?.isOpen).toBe(false)
    })

    it('shows error toast if delete fails', async () => {
        mockDeleteUnwrap.mockRejectedValue(mockError)

        const { result } = renderHook(() => useProductDetailsActions())

        let deleteAction = result.current.find((a) => a.key === 'delete')

        act(() => {
            deleteAction?.onClick()
        })

        deleteAction = result.current.find((a) => a.key === 'delete')
        const { onConfirm } = deleteAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDelete).toHaveBeenCalledWith('123')
    })

    it('returns empty array if no id is provided', () => {
        vi.mocked(useParams).mockReturnValue({})
        const { result } = renderHook(() => useProductDetailsActions())
        expect(result.current).toEqual([])
    })
})
