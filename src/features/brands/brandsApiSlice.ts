import { apiSlice } from '../api'
import { Brand } from './types'

const brandsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBrands: builder.query<Brand[], void>({
            query: () => '/brands/all',
        }),
    }),
})

export const { useGetBrandsQuery } = brandsApiSlice
