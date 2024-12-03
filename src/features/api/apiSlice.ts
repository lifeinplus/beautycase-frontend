import {
    type BaseQueryFn,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

import config from '../../config'
import { type AuthState, logout, setCredentials } from '../auth/authSlice'

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

const baseQuery = fetchBaseQuery({
    baseUrl: config.apiBaseUrl,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const { auth } = getState() as { auth: AuthState }
        if (auth.accessToken) {
            headers.set('authorization', `Bearer ${auth.accessToken}`)
        }
        return headers
    },
})

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error?.status === 401) {
        const refreshResult = await baseQuery('auth/refresh', api, extraOptions)

        if (refreshResult.data) {
            api.dispatch(setCredentials(refreshResult.data))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
        }
    }

    return result
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
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
