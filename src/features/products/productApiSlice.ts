import type { MutationResult, QueryResult } from '../../types'
import { cleanObject } from '../../utils'
import { apiSlice } from '../api/apiSlice'
import { type Product } from '../products'

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addProduct: builder.mutation<MutationResult, Product>({
            query: (data) => ({
                url: '/products/one',
                method: 'POST',
                body: cleanObject(data),
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

        editProduct: builder.mutation<Product, { id: string; body: Product }>({
            query: (data) => ({
                url: `/products/${data.id}`,
                method: 'PUT',
                body: cleanObject(data.body),
            }),
            invalidatesTags: (_result, _error, data) => [
                { type: 'Product', id: data.id },
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

        // TODO: move to a separate api slice
        uploadFile: builder.mutation<{ imageUrl: string }, FormData>({
            query: (formData) => {
                return {
                    url: `/uploads/image-temp`,
                    method: 'POST',
                    body: formData,
                }
            },
        }),
    }),
})

export const {
    useAddProductMutation,
    useDeleteProductMutation,
    useEditProductMutation,
    useGetProductByIdQuery,
    useGetProductsQuery,
    useUploadFileMutation,
} = productApiSlice
