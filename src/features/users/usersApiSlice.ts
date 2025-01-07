import { apiSlice } from '../api/apiSlice'

interface User {
    _id: string
    username: string
}

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => '/users/all',
        }),
    }),
})

export const { useGetUsersQuery } = usersApiSlice
