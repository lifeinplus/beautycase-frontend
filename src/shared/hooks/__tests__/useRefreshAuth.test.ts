import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/__mocks__/hooks'
import axiosClient from '../../api/axiosClient.config'
import { setCredentials } from '@/features/auth/authSlice'
import type { AuthState } from '@/features/auth/types'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { useRefreshAuth } from '../useRefreshAuth'

vi.mock('@/app/hooks')
vi.mock('../../api/axiosClient.config')

describe('useRefreshAuth', () => {
    const mockAuthResponse: AuthState = {
        accessToken: 'mock-access-token',
        role: 'admin',
        userId: '123',
        username: 'testuser',
    }

    beforeEach(() => {
        vi.mocked(axiosClient.get as Mock).mockResolvedValue({
            data: mockAuthResponse,
        })
    })

    it('fetches a new access token and dispatches credentials', async () => {
        const { result } = renderHook(() => useRefreshAuth())
        const refreshAuth = result.current

        const token = await refreshAuth()
        expect(token).toBe(mockAuthResponse.accessToken)

        expect(axiosClient.get).toHaveBeenCalledWith('auth/refresh')
        expect(mockDispatch).toHaveBeenCalledWith(
            setCredentials(mockAuthResponse)
        )
    })

    it('handles API errors gracefully', async () => {
        vi.mocked(axiosClient.get as Mock).mockRejectedValue(mockError)

        const { result } = renderHook(() => useRefreshAuth())
        const refreshAuth = result.current

        await expect(refreshAuth()).rejects.toThrow(mockError.message)
        expect(mockDispatch).not.toHaveBeenCalled()
    })
})
