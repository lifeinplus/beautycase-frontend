import { api } from '../api/api'
import type { User, UserResult } from './types'

const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        readUser: builder.query<UserResult, string>({
            query: (id) => `/users/${id}`,
        }),

        readUsers: builder.query<User[], void>({
            query: () => '/users',
        }),
    }),
})

export const { useReadUserQuery, useReadUsersQuery } = usersApi
