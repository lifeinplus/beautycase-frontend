import { apiSlice } from '../api/apiSlice'
import type { User, UserResult } from './types'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserById: builder.query<UserResult, string>({
            query: (id) => `/users/${id}`,
        }),
        getUsers: builder.query<User[], void>({
            query: () => '/users/all',
        }),
    }),
})

export const { useGetUserByIdQuery, useGetUsersQuery } = usersApiSlice
