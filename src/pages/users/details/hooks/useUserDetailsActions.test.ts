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

import {
    mockUserResult,
    useDeleteUserByIdMutation,
    useGetUserByIdQuery,
} from '@/features/users/api/__mocks__/usersApi'
import { mockError } from '@/tests/mocks'
import { mockLocation, mockNavigate } from '@/tests/mocks/router'
import { useUserDetailsActions } from './useUserDetailsActions'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/users/api/usersApi')

describe('useUserDetailsActions', () => {
    const mockDelete = vi.fn()
    const mockDeleteUnwrap = vi.fn()

    const spyConsoleError = vi.spyOn(console, 'error')

    vi.mocked(useLocation).mockReturnValue({
        ...mockLocation,
        pathname: '/users/123456789012345678901234',
    })

    beforeAll(() => {
        spyConsoleError.mockImplementation(() => {})
    })

    beforeEach(() => {
        useGetUserByIdQuery.mockReturnValue({
            data: mockUserResult,
            isLoading: false,
            error: null,
        })

        vi.mocked(useDeleteUserByIdMutation as Mock).mockReturnValue([
            mockDelete,
            { isLoading: false },
        ])

        mockDelete.mockReturnValue({ unwrap: mockDeleteUnwrap })
    })

    afterAll(() => {
        spyConsoleError.mockRestore()
    })

    it('returns correct number of actions', () => {
        const { result } = renderHook(() => useUserDetailsActions())
        expect(result.current).toHaveLength(2)
    })

    it('handles delete action', async () => {
        const { result } = renderHook(() => useUserDetailsActions())

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

        const { result } = renderHook(() => useUserDetailsActions())

        const deleteAction = result.current.find(
            (action) => action.key === 'delete'
        )

        const { onConfirm } = deleteAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDelete).toHaveBeenCalledWith('123')
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')
    })

    it('handles back action', async () => {
        const { result } = renderHook(() => useUserDetailsActions())

        const backAction = result.current.find(
            (action) => action.key === 'back'
        )

        expect(backAction).toBeDefined()

        await act(async () => {
            await backAction!.onClick()
        })

        expect(mockNavigate).toHaveBeenCalledWith('/users', {
            replace: true,
            state: { scrollId: '123' },
        })
    })

    it('returns empty array if no id is provided', () => {
        vi.mocked(useParams).mockReturnValue({})
        const { result } = renderHook(() => useUserDetailsActions())
        expect(result.current).toEqual([])
    })
})
