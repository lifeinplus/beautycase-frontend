import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { useAppDispatch } from '../../app/hooks'
import { axiosClient } from '../../features/api'
import { type AuthState, setCredentials } from '../../features/auth'
import { useRefreshAuth } from '../useRefreshAuth'

vi.mock('../../app/hooks', () => ({
    useAppDispatch: vi.fn(),
}))

vi.mock('../../features/api', () => ({
    axiosClient: {
        get: vi.fn(),
    },
}))

vi.mock('../../features/auth', () => ({
    setCredentials: vi.fn((payload) => ({
        type: 'auth/setCredentials',
        payload,
    })),
}))

describe('useRefreshAuth', () => {
    const mockDispatch = vi.fn()

    const mockResponse: AuthState = {
        accessToken: 'mock-access-token',
        role: 'admin',
        userId: '123',
        username: 'testuser',
    }

    beforeEach(() => {
        ;(useAppDispatch as unknown as Mock).mockReturnValue(mockDispatch)
        ;(axiosClient.get as Mock).mockResolvedValue({
            data: mockResponse,
        })
    })

    it('fetches a new access token and dispatches credentials', async () => {
        const { result } = renderHook(() => useRefreshAuth())
        const refreshAuth = result.current

        const token = await refreshAuth()
        expect(token).toBe(mockResponse.accessToken)

        expect(axiosClient.get).toHaveBeenCalledWith('auth/refresh')
        expect(mockDispatch).toHaveBeenCalledWith(setCredentials(mockResponse))
    })

    it('handles API errors gracefully', async () => {
        const mockError = new Error('Network error')
        ;(axiosClient.get as Mock).mockRejectedValue(mockError)

        const { result } = renderHook(() => useRefreshAuth())
        const refreshAuth = result.current

        await expect(refreshAuth()).rejects.toThrow('Network error')
        expect(mockDispatch).not.toHaveBeenCalled()
    })
})
