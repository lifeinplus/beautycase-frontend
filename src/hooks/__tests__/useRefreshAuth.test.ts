import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { useAppDispatch } from '../../app/hooks'
import { axiosClient } from '../../features/api'
import { setCredentials } from '../../features/auth'
import { mockAuthResponse } from '../../tests'
import { useRefreshAuth } from '../useRefreshAuth'

vi.mock('../../app/hooks', () => ({
    useAppDispatch: vi.fn(),
}))

describe('useRefreshAuth', () => {
    const mockDispatch = vi.fn()

    beforeEach(() => {
        ;(useAppDispatch as unknown as Mock).mockReturnValue(mockDispatch)
        ;(axiosClient.get as Mock).mockResolvedValue({
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
        const mockError = new Error('Network error')
        ;(axiosClient.get as Mock).mockRejectedValue(mockError)

        const { result } = renderHook(() => useRefreshAuth())
        const refreshAuth = result.current

        await expect(refreshAuth()).rejects.toThrow('Network error')
        expect(mockDispatch).not.toHaveBeenCalled()
    })
})
