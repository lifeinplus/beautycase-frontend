import { apiSlice } from '../api/apiSlice'
import type { User } from './types'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserById: builder.query<User, string>({
            query: (id) => `/users/${id}`,
        }),
        getUsers: builder.query<User[], void>({
            query: () => '/users/all',
        }),
    }),
})

export const { useGetUserByIdQuery, useGetUsersQuery } = usersApiSlice
