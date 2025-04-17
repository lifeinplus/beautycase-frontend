import { renderHook, act } from '@testing-library/react'
import toast from 'react-hot-toast'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import { mockError } from '../../../../tests/mocks'
import { mockDispatch } from '../../../../tests/mocks/app'
import { mockNavigate } from '../../../../tests/mocks/router'
import { useLogoutUserMutation } from '../../authApiSlice'
import { logout } from '../../authSlice'
import { useAuthLogout } from '../useAuthLogout'

vi.mock('../../../../utils/errorUtils', () => ({
    getErrorMessage: vi.fn((error) => error.message),
}))

vi.mock('../../authApiSlice', () => ({
    useLogoutUserMutation: vi.fn(),
}))

describe('useAuthLogout', () => {
    const mockLogoutUser = vi.fn()

    beforeEach(() => {
        vi.mocked(useLogoutUserMutation as Mock).mockReturnValue([
            mockLogoutUser,
        ])

        mockLogoutUser.mockResolvedValue({})
    })

    it('logs out user, dispatches logout, and navigates to the redirect path', async () => {
        const customRedirectPath = '/login'

        const { result } = renderHook(() => useAuthLogout(customRedirectPath))

        await act(async () => {
            await result.current()
        })

        expect(mockLogoutUser).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith(logout())
        expect(mockNavigate).toHaveBeenCalledWith(customRedirectPath)
    })

    it('handles errors correctly when logout fails', async () => {
        mockLogoutUser.mockRejectedValue(mockError)

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        const { result } = renderHook(() => useAuthLogout())

        await act(async () => {
            await result.current()
        })

        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)
        expect(mockNavigate).not.toHaveBeenCalled()
        expect(mockDispatch).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
