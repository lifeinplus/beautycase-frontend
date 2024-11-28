import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Product {
    _id: string
    name: string
    image: string
    buy: string
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => '/products/all',
        }),
    }),
})

export const { useGetProductsQuery } = apiSlice
