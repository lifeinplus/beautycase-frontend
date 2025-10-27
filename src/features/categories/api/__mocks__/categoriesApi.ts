import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import type { MutationResult } from '@/shared/api/types'
import type { Category } from '../../types'
import { type CategoryWithCount } from '../categoriesApi'

export const mockCategoryCreate: MutationResult = {
    id: 'category3',
}

export const mockCategory1: Category = {
    _id: 'category1',
    name: 'basic',
    type: 'makeup_bag',
}

export const mockCategory2: Category = {
    _id: 'category2',
    name: 'luxury',
    type: 'makeup_bag',
}

export const mockCategoryWithCount: CategoryWithCount = {
    ...mockCategory1,
    productCount: 5,
}

export const mockCategories: Category[] = [mockCategory1, mockCategory2]

export const useCreateCategoryMutation = vi.fn()
export const useGetAllCategoriesQuery = vi.fn()
export const useGetMakeupBagCategoriesQuery = vi.fn()
export const useGetProductCategoriesQuery = vi.fn()
export const useGetProductCategoriesWithCountsQuery = vi.fn()
export const useUpdateCategoryByIdMutation = vi.fn()
export const useDeleteCategoryByIdMutation = vi.fn()

const categoriesHandlers = [
    http.post('api/categories', () => HttpResponse.json(mockCategoryCreate)),

    http.get('api/categories', () => HttpResponse.json(mockCategories)),

    http.get('api/categories/products', () =>
        HttpResponse.json(mockCategories)
    ),

    http.put('api/categories/:id', ({ params }) =>
        HttpResponse.json({ id: params.id })
    ),

    http.delete('api/categories/:id', ({ params }) =>
        HttpResponse.json({ id: params.id })
    ),
]

export default categoriesHandlers
