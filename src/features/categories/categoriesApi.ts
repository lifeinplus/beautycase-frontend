import { api } from '@/shared/api/api'
import { MutationResult } from '@/shared/types/api'
import type { Category } from './types'

const categoriesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation<MutationResult, Category>({
            query: (body) => ({
                url: '/categories',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Category'],
        }),

        getAllCategories: builder.query<Category[], void>({
            query: () => '/categories',
            providesTags: ['Category'],
        }),

        updateCategoryById: builder.mutation<
            Category,
            { id: string; category: Category }
        >({
            query: ({ id, category }) => ({
                url: `/categories/${id}`,
                method: 'PUT',
                body: category,
            }),
            invalidatesTags: ['Category'],
        }),

        deleteCategoryById: builder.mutation<MutationResult, string>({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        }),
    }),
})

export const {
    useCreateCategoryMutation,
    useGetAllCategoriesQuery,
    useUpdateCategoryByIdMutation,
    useDeleteCategoryByIdMutation,
} = categoriesApi
