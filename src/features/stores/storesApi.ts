import type { MutationResult, QueryResult } from '../../types/api'
import { api } from '../api/api'
import type { Store } from './types'

const storesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createStore: builder.mutation<MutationResult, Store>({
            query: (body) => ({
                url: '/stores',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Store'],
        }),

        readStores: builder.query<Store[], void>({
            query: () => '/stores',
            providesTags: ['Store'],
        }),

        updateStore: builder.mutation<Store, Store>({
            query: ({ _id, ...body }) => ({
                url: `/stores/${_id}`,
                method: 'PUT',
                body: body,
            }),
            invalidatesTags: ['Store'],
        }),

        deleteStore: builder.mutation<QueryResult, string>({
            query: (id) => ({
                url: `/stores/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Store'],
        }),
    }),
})

export const {
    useCreateStoreMutation,
    useReadStoresQuery,
    useUpdateStoreMutation,
    useDeleteStoreMutation,
} = storesApi
