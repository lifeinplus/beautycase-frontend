import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import config from '../../config'

export interface Stage {
    title: string
    image: string
    subtitle: string
    steps: string[]
    productIds: Product[]
}

export interface Product {
    _id: string
    name: string
    image: string
    buy: string
}

export interface Brand {
    name: string
    link: string
    toolIds: Tool[]
}

export interface Tool {
    name: string
    image: string
    number?: string
    comment?: string
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: config.apiBaseUrl }),
    endpoints: (builder) => ({
        getBrands: builder.query<Brand[], void>({
            query: () => '/brands/all',
        }),
        getProducts: builder.query<Product[], void>({
            query: () => '/products/all',
        }),
        getStages: builder.query<Stage[], void>({
            query: () => '/stages/all',
        }),
        getTools: builder.query<Tool[], void>({
            query: () => '/tools/all',
        }),
    }),
})

export const {
    useGetBrandsQuery,
    useGetProductsQuery,
    useGetStagesQuery,
    useGetToolsQuery,
} = apiSlice
