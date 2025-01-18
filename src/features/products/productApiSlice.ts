import type { MutationResult, QueryResult } from '../../types'
import { apiSlice } from '../api/apiSlice'
import type { Product } from './types'

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addProduct: builder.mutation<MutationResult, Partial<Product>>({
            query: (data) => ({
                url: '/products/one',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),

        deleteProduct: builder.mutation<QueryResult, string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => [{ type: 'Product', id: 'LIST' }],
        }),

        editProduct: builder.mutation<
            Product,
            { id: string } & Partial<Product>
        >({
            query: ({
                id,
                name,
                brandId,
                image,
                shade,
                comment,
                storeLinks,
            }) => ({
                url: `/products/${id}`,
                method: 'PUT',
                body: { name, brandId, image, shade, comment, storeLinks },
            }),
            invalidatesTags: (_result, _error, product) => [
                { type: 'Product', id: product._id },
                { type: 'Product', id: 'LIST' },
            ],
        }),

        getProductById: builder.query<Product, string>({
            query: (id) => `/products/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Product', id }],
        }),

        getProducts: builder.query<Product[], void>({
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
    }),
})

export const {
    useAddProductMutation,
    useDeleteProductMutation,
    useEditProductMutation,
    useGetProductByIdQuery,
    useGetProductsQuery,
} = productApiSlice
