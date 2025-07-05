import { api } from '@/shared/api/api'
import type { Category } from './types'

const categoriesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query<Category[], void>({
            query: () => '/categories',
        }),
    }),
})

export const { useGetAllCategoriesQuery } = categoriesApi
