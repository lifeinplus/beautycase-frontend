import type { MutationResult, QueryResult } from '../../types/api'
import { api } from '../api/api'
import type { Brand } from './types'

const brandsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createBrand: builder.mutation<MutationResult, Brand>({
            query: (body) => ({
                url: '/brands',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Brand'],
        }),
        readBrands: builder.query<Brand[], void>({
            query: () => '/brands',
            providesTags: ['Brand'],
        }),
        updateBrand: builder.mutation<Brand, Brand>({
            query: ({ _id, ...body }) => ({
                url: `/brands/${_id}`,
                method: 'PUT',
                body: body,
            }),
            invalidatesTags: ['Brand'],
        }),
        deleteBrand: builder.mutation<QueryResult, string>({
            query: (id) => ({
                url: `/brands/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Brand'],
        }),
    }),
})

export const {
    useCreateBrandMutation,
    useReadBrandsQuery,
    useUpdateBrandMutation,
    useDeleteBrandMutation,
} = brandsApi
