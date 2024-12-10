import { apiSlice, type Tool } from '../api'

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
