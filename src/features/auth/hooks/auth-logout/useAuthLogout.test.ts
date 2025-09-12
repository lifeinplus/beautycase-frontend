import { act, renderHook } from '@testing-library/react'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/hooks/__mocks__/hooks'
import { useLogoutUserMutation } from '@/features/auth/api/authApi'
import { mockError } from '@/shared/utils/error/__mocks__/getErrorMessage'
import { mockNavigate } from '@/tests/mocks/router'
import { logout } from '../../slice/authSlice'
import { useAuthLogout } from './useAuthLogout'

vi.mock('@/app/hooks/hooks')
vi.mock('@/shared/utils/error/getErrorMessage')
vi.mock('@/features/auth/api/authApi')

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
