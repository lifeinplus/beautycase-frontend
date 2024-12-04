import { apiSlice } from '../api'
import { AuthState } from './authSlice'

interface AuthQueryLogin {
    username: string
    password: string
}

interface AuthResultLogin extends Pick<AuthState, 'accessToken' | 'userId'> {}

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation<AuthResultLogin, AuthQueryLogin>({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        logoutUser: builder.mutation<void, void>({
            query: () => ({
                url: 'auth/logout',
                method: 'POST',
            }),
        }),
    }),
})

export const { useLoginUserMutation, useLogoutUserMutation } = authApiSlice
