import { apiSlice } from '../api'
import { AuthState } from './authSlice'

interface AuthQueryLogin {
    username: string
    password: string
}

interface AuthResultLogin extends Pick<AuthState, 'accessToken' | 'userId'> {}

interface AuthResultRegister {
    message: string
}

interface AuthQueryRegister {
    username: string
    password: string
    confirmPassword: string
}

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
        registerUser: builder.mutation<AuthResultRegister, AuthQueryRegister>({
            query: (credentials) => ({
                url: 'auth/register',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
})

export const {
    useLoginUserMutation,
    useLogoutUserMutation,
    useRegisterUserMutation,
} = authApiSlice
