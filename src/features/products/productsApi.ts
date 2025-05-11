import type { MutationResult, QueryResult } from '../../types/api'
import { cleanObject } from '../../utils/common'
import { api } from '../api/api'
import type { Product } from './types'

const productsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation<MutationResult, Product>({
            query: (data) => ({
                url: '/products',
                method: 'POST',
                body: cleanObject(data),
            }),
            invalidatesTags: ['Product'],
        }),

        readProduct: builder.query<Product, string>({
            query: (id) => `/products/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Product', id }],
        }),

        readProducts: builder.query<Product[], void>({
            query: () => '/products',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ _id }) => ({
                              type: 'Product' as const,
                              id: _id,
                          })),
                          { type: 'Product', id: 'LIST' },
                      ]
                    : [{ type: 'Product', id: 'LIST' }],
        }),

        updateProduct: builder.mutation<Product, { id: string; body: Product }>(
            {
                query: (data) => ({
                    url: `/products/${data.id}`,
                    method: 'PUT',
                    body: cleanObject(data.body),
                }),
                invalidatesTags: (_result, _error, data) => [
                    { type: 'Product', id: data.id },
                    { type: 'Product', id: 'LIST' },
                ],
            }
        ),

        deleteProduct: builder.mutation<QueryResult, string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => [{ type: 'Product', id: 'LIST' }],
        }),
    }),
})

export const {
    useCreateProductMutation,
    useReadProductQuery,
    useReadProductsQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApi
