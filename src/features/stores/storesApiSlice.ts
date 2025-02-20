import type { MutationResult, QueryResult } from '../../types'
import { apiSlice } from '../api'
import { type Store } from '../stores'

const storesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createStore: builder.mutation<MutationResult, Partial<Store>>({
            query: (newStore) => ({
                url: '/stores',
                method: 'POST',
                body: newStore,
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
