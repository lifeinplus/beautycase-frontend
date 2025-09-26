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

import { mockTool1 } from '@/features/tools/api/__mocks__/toolsApi'
import {
    useDeleteToolByIdMutation,
    useGetToolByIdQuery,
} from '@/features/tools/api/toolsApi'
import { mockError } from '@/tests/mocks'
import { mockLocation, mockNavigate } from '@/tests/mocks/router'
import { useToolDetailsActions } from './useToolDetailsActions'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/tools/api/toolsApi')

describe('useToolDetailsActions', () => {
    const mockDeleteToolById = vi.fn()
    const mockDeleteUnwrap = vi.fn()

    const spyConsoleError = vi.spyOn(console, 'error')

    vi.mocked(useLocation).mockReturnValue({
        ...mockLocation,
        pathname: '/tools/123456789012345678901234',
    })

    beforeAll(() => {
        spyConsoleError.mockImplementation(() => {})
    })

    beforeEach(() => {
        vi.mocked(useDeleteToolByIdMutation as Mock).mockReturnValue([
            mockDeleteToolById,
            { isLoading: false },
        ])

        mockDeleteToolById.mockReturnValue({ unwrap: mockDeleteUnwrap })

        vi.mocked(useGetToolByIdQuery as Mock).mockReturnValue({
            data: mockTool1,
            isLoading: false,
            error: null,
        })
    })

    afterAll(() => {
        spyConsoleError.mockRestore()
    })

    it('returns correct number of actions', () => {
        const { result } = renderHook(() => useToolDetailsActions())
        expect(result.current).toHaveLength(3)
    })

    it('handles delete action', async () => {
        const { result } = renderHook(() => useToolDetailsActions())

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
        expect(mockNavigate).toHaveBeenCalledWith('/tools')
    })

    it('closes modal when cancel is called', async () => {
        const { result } = renderHook(() => useToolDetailsActions())

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

        const { result } = renderHook(() => useToolDetailsActions())

        let deleteAction = result.current.find((a) => a.key === 'delete')

        act(() => {
            deleteAction?.onClick()
        })

        deleteAction = result.current.find((a) => a.key === 'delete')
        const { onConfirm } = deleteAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDeleteToolById).toHaveBeenCalledWith('123')
    })

    it('handles back action', async () => {
        const { result } = renderHook(() => useToolDetailsActions())

        const backAction = result.current.find(
            (action) => action.key === 'back'
        )

        expect(backAction).toBeDefined()

        await act(async () => {
            await backAction!.onClick()
        })

        expect(mockNavigate).toHaveBeenCalledWith('/tools', {
            replace: true,
            state: { scrollId: '123' },
        })
    })

    it('returns empty array if no id is provided', () => {
        vi.mocked(useParams).mockReturnValue({})
        const { result } = renderHook(() => useToolDetailsActions())
        expect(result.current).toEqual([])
    })
})
