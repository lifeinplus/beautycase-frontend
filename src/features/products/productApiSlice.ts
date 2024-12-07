import { apiSlice } from '../api/apiSlice'

export interface Product {
    _id?: string
    name: string
    image: string
    buy: string
}

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation<Product, Partial<Product>>({
            query: (data) => ({
                url: '/products/one',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),
        deleteProduct: builder.mutation<void, string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'],
        }),
        fetchProducts: builder.query<Product[], void>({
            query: () => '/products/all',
            providesTags: ['Products'],
        }),
        fetchProductById: builder.query<Product, string>({
            query: (id) => `/products/${id}`,
            providesTags: ['Products'],
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
            invalidatesTags: ['Products'],
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
