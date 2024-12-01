import { apiSlice } from '../api'
import { AuthState } from '.'

interface AuthQueryLogin {
    username: string
    password: string
}

interface AuthResultLogin extends Pick<AuthState, 'accessToken' | 'userId'> {}

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResultLogin, AuthQueryLogin>({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
})

export const { useLoginMutation } = authApiSlice
