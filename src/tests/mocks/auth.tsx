import { vi } from 'vitest'
import { type AuthState } from '../../features/auth'

export const mockAuthResponse: AuthState = {
    accessToken: 'mock-access-token',
    role: 'admin',
    userId: '123',
    username: 'testuser',
}

export const mockAuth = () => {
    vi.mock('../../features/auth', async (importOriginal) => {
        const actual = await importOriginal()

        return {
            ...(actual as object),

            AuthButton: () => (
                <button data-testid="auth-button">Sign In</button>
            ),

            setCredentials: vi.fn((payload) => ({
                type: 'auth/setCredentials',
                payload,
            })),
        }
    })
}
