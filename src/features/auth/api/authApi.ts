import { api } from '@/shared/api/api'
import type {
    AuthQueryLogin,
    AuthQueryRegister,
    AuthResultLogin,
} from '../types'

const authApi = api.injectEndpoints({
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
        registerUser: builder.mutation<void, AuthQueryRegister>({
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
} = authApi
