import { apiSlice } from '../api'
import type { Category } from './types'

const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => '/categories/all',
        }),
    }),
})

export const { useGetCategoriesQuery } = categoriesApiSlice
