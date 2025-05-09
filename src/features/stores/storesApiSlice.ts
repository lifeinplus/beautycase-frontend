import type { MutationResult, QueryResult } from '../../types/api'
import { apiSlice } from '../api/apiSlice'
import type { Store } from './types'

const storesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createStore: builder.mutation<MutationResult, Store>({
            query: (body) => ({
                url: '/stores',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Stores'],
        }),
        readStores: builder.query<Store[], void>({
            query: () => '/stores',
            providesTags: ['Stores'],
        }),
        updateStore: builder.mutation<Store, Store>({
            query: ({ _id, ...body }) => ({
                url: `/stores/${_id}`,
                method: 'PUT',
                body: body,
            }),
            invalidatesTags: ['Stores'],
        }),
        deleteStore: builder.mutation<QueryResult, string>({
            query: (id) => ({
                url: `/stores/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Stores'],
        }),
    }),
})

export const {
    useCreateStoreMutation,
    useReadStoresQuery,
    useUpdateStoreMutation,
    useDeleteStoreMutation,
} = storesApiSlice
