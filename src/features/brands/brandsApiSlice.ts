import type { MutationResult, QueryResult } from '../../types/api'
import { apiSlice } from '../api/apiSlice'
import type { Brand } from './types'

const brandsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createBrand: builder.mutation<MutationResult, Brand>({
            query: (body) => ({
                url: '/brands',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Brands'],
        }),
        readBrands: builder.query<Brand[], void>({
            query: () => '/brands',
            providesTags: ['Brands'],
        }),
        updateBrand: builder.mutation<Brand, Brand>({
            query: ({ _id, ...body }) => ({
                url: `/brands/${_id}`,
                method: 'PUT',
                body: body,
            }),
            invalidatesTags: ['Brands'],
        }),
        deleteBrand: builder.mutation<QueryResult, string>({
            query: (id) => ({
                url: `/brands/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Brands'],
        }),
    }),
})

export const {
    useCreateBrandMutation,
    useReadBrandsQuery,
    useUpdateBrandMutation,
    useDeleteBrandMutation,
} = brandsApiSlice
