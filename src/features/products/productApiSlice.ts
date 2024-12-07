import { apiSlice } from '../api/apiSlice'

export interface Product {
    _id?: string
    name: string
    image: string
    buy: string
}

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchProducts: builder.query<Product[], void>({
            query: () => '/products/all',
        }),
        fetchProductById: builder.query<Product, string>({
            query: (id) => `/products/${id}`,
        }),
        createProduct: builder.mutation<Product, Partial<Product>>({
            query: (data) => ({
                url: '/products',
                method: 'POST',
                body: data,
            }),
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
        }),
        deleteProduct: builder.mutation<void, string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useFetchProductsQuery,
    useFetchProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApiSlice
