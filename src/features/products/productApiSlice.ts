import { apiSlice } from '../api/apiSlice'
import type { Product, QueryResult } from './types'

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation<Product, Partial<Product>>({
            query: (data) => ({
                url: '/products/one',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        fetchProducts: builder.query<Product[], void>({
            query: () => '/products/all',
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
        fetchProductById: builder.query<Product, string>({
            query: (id) => `/products/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Product', id }],
        }),
        updateProduct: builder.mutation<
            Product,
            { id: string } & Partial<Product>
        >({
            query: ({ id, ...data }) => ({
                url: `/products/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, product) => [
                { type: 'Product', id: product._id },
                { type: 'Product', id: 'LIST' },
            ],
        }),
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
    useDeleteProductMutation,
    useFetchProductsQuery,
    useFetchProductByIdQuery,
    useUpdateProductMutation,
} = productApiSlice
