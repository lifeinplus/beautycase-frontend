import { apiSlice } from '../api'
import type { Store } from './types'

const storesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readStores: builder.query<Store[], void>({
            query: () => '/stores',
        }),
    }),
})

export const { useReadStoresQuery } = storesApiSlice
