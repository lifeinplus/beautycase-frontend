import type { MutationResult, QueryResult } from '../../shared/types/api'
import { api } from '../../shared/api/api'
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

        getAllBrands: builder.query<Brand[], void>({
            query: () => '/brands',
            providesTags: ['Brand'],
        }),

        updateBrandById: builder.mutation<Brand, { id: string; brand: Brand }>({
            query: ({ id, brand }) => ({
                url: `/brands/${id}`,
                method: 'PUT',
                body: brand,
            }),
            invalidatesTags: ['Brand'],
        }),

        deleteBrandById: builder.mutation<QueryResult, string>({
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
    useGetAllBrandsQuery,
    useUpdateBrandByIdMutation,
    useDeleteBrandByIdMutation,
} = brandsApi
