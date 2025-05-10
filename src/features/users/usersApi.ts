import { api } from '../api/api'
import type { User, UserResult } from './types'

const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserById: builder.query<UserResult, string>({
            query: (id) => `/users/${id}`,
        }),
        getUsers: builder.query<User[], void>({
            query: () => '/users/all',
        }),
    }),
})

export const { useGetUserByIdQuery, useGetUsersQuery } = usersApi
