import { vi } from 'vitest'
import { type AuthState } from '../../features/auth/authSlice'

export const mockAuthResponse: AuthState = {
    accessToken: 'mock-access-token',
    role: 'admin',
    userId: '123',
    username: 'testuser',
}

export const mockHandleLogout = vi.fn()

export const mockAuth = () => {
    vi.mock('../../features/auth/authSlice', async (importOriginal) => {
        const actual = await importOriginal()

        return {
            ...(actual as object),
            setCredentials: vi.fn((payload) => ({
                type: 'auth/setCredentials',
                payload,
            })),
        }
    })
}
