import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import type {
    AuthQueryLogin,
    AuthQueryRegister,
    AuthResultLogin,
    AuthState,
} from '../../types'

export const mockLoginParams = {
    username: 'testuser',
    password: 'password123',
}

export const mockLoginResult: AuthResultLogin = {
    accessToken: 'token1',
    userId: 'user1',
}

export const mockRefreshResult: AuthState = {
    accessToken: 'token1',
    role: 'role1',
    userId: 'user1',
    username: 'testuser',
}

export const mockRegisterParams: AuthQueryRegister = {
    username: 'testuser',
    password: 'password123',
    confirmPassword: 'password123',
}

export const useLoginUserMutation = vi.fn()
export const useLogoutUserMutation = vi.fn()
export const useRegisterUserMutation = vi.fn()

const authHandlers = [
    http.post('api/auth/login', async ({ request }) => {
        const requestBody = (await request.json()) as AuthQueryLogin

        if (
            requestBody?.username === mockLoginParams.username &&
            requestBody?.password === mockLoginParams.password
        ) {
            return HttpResponse.json(mockLoginResult, { status: 200 })
        }

        return HttpResponse.json('Unauthorized', { status: 401 })
    }),

    http.post('api/auth/logout', () => {
        return HttpResponse.json(null, { status: 200 })
    }),

    http.post('api/auth/register', async ({ request }) => {
        const requestBody = (await request.json()) as AuthQueryRegister

        if (requestBody.password === requestBody.confirmPassword) {
            return HttpResponse.json({ status: 201 })
        }

        return HttpResponse.json('Passwords do not match', { status: 400 })
    }),

    http.get('api/auth/refresh', () => {
        return HttpResponse.json(mockRefreshResult, { status: 200 })
    }),
]

export default authHandlers
