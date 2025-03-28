import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock } from 'vitest'

import { axiosClient } from '../../features/api'
import { setCredentials } from '../../features/auth'
import { mockAuthResponse, mockDispatch } from '../../tests'
import { useRefreshAuth } from '../useRefreshAuth'

describe('useRefreshAuth', () => {
    beforeEach(() => {
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
