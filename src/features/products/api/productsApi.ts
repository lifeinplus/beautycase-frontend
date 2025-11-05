import { api } from '@/shared/api/api'
import type { MutationResult, QueryResult } from '@/shared/api/types'
import { cleanObject } from '@/shared/utils/object/cleanObject'
import type { Product } from '../types'

const productsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation<MutationResult, Product>({
            query: (data) => ({
                url: '/products',
                method: 'POST',
                body: cleanObject(data),
            }),
            invalidatesTags: ['Product', 'Category'],
        }),

        duplicateProductById: builder.mutation<MutationResult, string>({
            query: (id) => ({
                url: `/products/duplicate/${id}`,
                method: 'POST',
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

        getMineProducts: builder.query<Product[], void>({
            query: () => '/products/mine',
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

        getMineProductsByCategory: builder.query<Product[], string>({
            query: (category) => `/products/mine/category/${category}`,
            providesTags: (_result, _error, id) => [
                { type: 'Product', id },
                { type: 'Product', id: 'LIST' },
            ],
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
                { type: 'Category' },
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
            invalidatesTags: () => [
                { type: 'Product', id: 'LIST' },
                { type: 'Category' },
            ],
        }),
    }),
})

export const {
    useCreateProductMutation,
    useDuplicateProductByIdMutation,
    useGetAllProductsQuery,
    useGetMineProductsQuery,
    useGetMineProductsByCategoryQuery,
    useGetProductByIdQuery,
    useUpdateProductByIdMutation,
    useUpdateProductStoreLinksMutation,
    useDeleteProductByIdMutation,
} = productsApi
