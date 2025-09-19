import { api } from '@/shared/api/api'
import { MutationResult } from '@/shared/api/types'
import type { Category } from '../types'

export interface CategoryWithCount extends Category {
    productCount: number
}

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

        getMakeupBagCategories: builder.query<Category[], void>({
            query: () => '/categories/makeup-bags',
            providesTags: ['Category'],
        }),

        getProductCategories: builder.query<Category[], void>({
            query: () => '/categories/products',
            providesTags: ['Category'],
        }),

        getProductCategoriesWithCounts: builder.query<
            CategoryWithCount[],
            void
        >({
            query: () => '/categories/products/with-counts',
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
    useGetMakeupBagCategoriesQuery,
    useGetProductCategoriesQuery,
    useGetProductCategoriesWithCountsQuery,
    useUpdateCategoryByIdMutation,
    useDeleteCategoryByIdMutation,
} = categoriesApi
