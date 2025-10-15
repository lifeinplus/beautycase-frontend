import { api } from '@/shared/api/api'
import type { QueryResult } from '@/shared/api/types'
import type { User, UserResult } from '../types'

const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<User[], void>({
            query: () => '/users',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ _id }) => ({
                              type: 'User' as const,
                              id: _id,
                          })),
                          { type: 'User', id: 'LIST' },
                      ]
                    : [{ type: 'User', id: 'LIST' }],
        }),

        getUserById: builder.query<UserResult, string | undefined>({
            query: (id) => `/users/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'User', id }],
        }),

        deleteUserById: builder.mutation<QueryResult, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => [{ type: 'User', id: 'LIST' }],
        }),
    }),
})

export const {
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useDeleteUserByIdMutation,
} = usersApi
