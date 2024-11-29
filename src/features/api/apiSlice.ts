import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import config from '../../config'

export interface Product {
    _id: string
    name: string
    image: string
    buy: string
}

export interface Tool {
    _id: string
    name: string
    image: string
    number?: string
    comment?: string
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: config.apiBaseUrl }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => '/products/all',
        }),
        getTools: builder.query<Tool[], void>({
            query: () => '/tools/all',
        }),
    }),
})

export const { useGetProductsQuery, useGetToolsQuery } = apiSlice
