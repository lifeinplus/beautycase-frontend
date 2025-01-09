import { apiSlice } from '../api'
import type { Tool } from '../tools'

export interface Brand {
    _id: string
    name: string
    link: string
    toolIds?: Partial<Tool>[]
}

const brandsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBrands: builder.query<Brand[], void>({
            query: () => '/brands/all',
        }),
    }),
})

export const { useGetBrandsQuery } = brandsApiSlice
