import type { MutationResult, QueryResult } from '../../types'
import { apiSlice } from '../api'
import { type Brand } from '../brands'

const brandsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createBrand: builder.mutation<MutationResult, Partial<Brand>>({
            query: (newBrand) => ({
                url: '/brands',
                method: 'POST',
                body: newBrand,
            }),
            invalidatesTags: ['Brands'],
        }),
        readBrands: builder.query<Brand[], void>({
            query: () => '/brands',
            providesTags: ['Brands'],
        }),
        updateBrand: builder.mutation<
            Brand,
            { id: string; body: Partial<Brand> }
        >({
            query: (data) => ({
                url: `/brands/${data.id}`,
                method: 'PUT',
                body: data.body,
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
