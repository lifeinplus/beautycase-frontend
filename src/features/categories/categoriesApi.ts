import { api } from '../api/api'
import type { Category } from './types'

const categoriesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => '/categories/all',
        }),
    }),
})

export const { useGetCategoriesQuery } = categoriesApi
