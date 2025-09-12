import { api } from '@/shared/api/api'
import type { MutationResult, QueryResult } from '@/shared/api/types'
import type { Store } from '../types'

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

        getAllStores: builder.query<Store[], void>({
            query: () => '/stores',
            providesTags: ['Store'],
        }),

        updateStoreById: builder.mutation<Store, { id: string; store: Store }>({
            query: ({ id, store }) => ({
                url: `/stores/${id}`,
                method: 'PUT',
                body: store,
            }),
            invalidatesTags: ['Store'],
        }),

        deleteStoreById: builder.mutation<QueryResult, string>({
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
    useGetAllStoresQuery,
    useUpdateStoreByIdMutation,
    useDeleteStoreByIdMutation,
} = storesApi
