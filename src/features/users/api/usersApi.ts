import { api } from '@/shared/api/api'
import type { User, UserResult } from '../types'

const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<User[], void>({
            query: () => '/users',
        }),

        getUserById: builder.query<UserResult, string | undefined>({
            query: (id) => `/users/${id}`,
        }),
    }),
})

export const { useGetAllUsersQuery, useGetUserByIdQuery } = usersApi
