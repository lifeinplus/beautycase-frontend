import { apiSlice } from '../api'
import type { Tool } from '../tools'

export interface Brand {
    name: string
    link: string
    toolIds: Tool[]
}

const brandsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBrands: builder.query<Brand[], void>({
            query: () => '/brands/all',
        }),
    }),
})

export const { useGetBrandsQuery } = brandsApiSlice
