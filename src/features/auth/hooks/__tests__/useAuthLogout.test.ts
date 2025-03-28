import { renderHook, act } from '@testing-library/react'
import toast from 'react-hot-toast'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import { mockDispatch, mockNavigate } from '../../../../tests'
import { useLogoutUserMutation } from '../../authApiSlice'
import { logout } from '../../authSlice'
import { useAuthLogout } from '../useAuthLogout'

vi.mock('../../../../utils/errorUtils', () => ({
    getErrorMessage: vi.fn((error) => String(error)),
}))

vi.mock('../../authApiSlice', () => ({
    useLogoutUserMutation: vi.fn(),
}))

describe('useAuthLogout', () => {
    const mockLogoutUser = vi.fn().mockResolvedValue({})

    beforeEach(() => {
        ;(useLogoutUserMutation as Mock).mockReturnValue([mockLogoutUser])
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
        const mockError = new Error('Logout failed')

        mockLogoutUser.mockRejectedValue(mockError)

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        const { result } = renderHook(() => useAuthLogout())

        await act(async () => {
            await result.current()
        })

        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(expect.any(String))
        expect(mockNavigate).not.toHaveBeenCalled()
        expect(mockDispatch).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
