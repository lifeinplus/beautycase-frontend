import { apiSlice } from '../api'
import type { Store } from './types'

const storesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStores: builder.query<Store[], void>({
            query: () => '/stores/all',
        }),
    }),
})

export const { useGetStoresQuery } = storesApiSlice
