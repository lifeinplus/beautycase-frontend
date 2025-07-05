import { act, renderHook } from '@testing-library/react'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/__mocks__/hooks'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { mockNavigate } from '@/tests/mocks/router'
import { useLogoutUserMutation } from '../../authApi'
import { logout } from '../../authSlice'
import { useAuthLogout } from '../useAuthLogout'

vi.mock('@/app/hooks')
vi.mock('@/shared/utils/errorUtils')
vi.mock('../../authApi')

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
