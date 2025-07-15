import { api } from '@/shared/api/api'
import type { MutationResult, QueryResult } from '@/shared/types/api'
import { cleanObject } from '@/shared/utils/common'
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

        getAllProducts: builder.query<Product[], void>({
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

        getProductById: builder.query<Product, string>({
            query: (id) => `/products/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Product', id }],
        }),

        updateProductById: builder.mutation<
            Product,
            { id: string; product: Product }
        >({
            query: ({ id, product }) => ({
                url: `/products/${id}`,
                method: 'PUT',
                body: cleanObject(product),
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Product', id: id },
                { type: 'Product', id: 'LIST' },
            ],
        }),

        updateProductStoreLinks: builder.mutation<
            MutationResult,
            { id: string; data: Pick<Product, 'storeLinks'> }
        >({
            query: ({ id, data }) => ({
                url: `/products/${id}/store-links`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Product', id: id },
                { type: 'Product', id: 'LIST' },
            ],
        }),

        deleteProductById: builder.mutation<QueryResult, string>({
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
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useUpdateProductByIdMutation,
    useUpdateProductStoreLinksMutation,
    useDeleteProductByIdMutation,
} = productsApi
