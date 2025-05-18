import { api } from '../api/api'
import type { Category } from './types'

const categoriesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        readCategories: builder.query<Category[], void>({
            query: () => '/categories',
        }),
    }),
})

export const { useReadCategoriesQuery } = categoriesApi
