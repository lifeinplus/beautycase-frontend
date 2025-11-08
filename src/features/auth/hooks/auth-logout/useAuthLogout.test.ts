import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/hooks/__mocks__/hooks'
import { useLogoutUserMutation } from '@/features/auth/api/authApi'
import { mockError } from '@/tests/mocks'
import { mockNavigate } from '@/tests/mocks/router'
import { spyConsoleError } from '@/tests/setup'
import { logout } from '../../slice/authSlice'
import { useAuthLogout } from './useAuthLogout'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/auth/api/authApi')

describe('useAuthLogout', () => {
    const mockLogoutUser = vi.fn()
    const mockLogoutUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useLogoutUserMutation as Mock).mockReturnValue([
            mockLogoutUser,
        ])

        mockLogoutUser.mockReturnValue({ unwrap: mockLogoutUnwrap })
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
        mockLogoutUnwrap.mockRejectedValue(mockError)

        const { result } = renderHook(() => useAuthLogout())

        await act(async () => {
            await result.current()
        })

        expect(spyConsoleError).toHaveBeenCalledWith(
            'Logout request failed',
            mockError
        )

        expect(mockNavigate).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalled()
    })
})
