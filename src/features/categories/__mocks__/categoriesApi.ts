import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import type { MutationResult } from '@/shared/types/api'
import type { Category } from '../types'

export const mockCategoryCreate: MutationResult = {
    id: 'category3',
    message: 'Category created successfully',
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

export const mockCategories: Category[] = [mockCategory1, mockCategory2]

export const useCreateCategoryMutation = vi.fn()
export const useGetAllCategoriesQuery = vi.fn()
export const useUpdateCategoryByIdMutation = vi.fn()
export const useDeleteCategoryByIdMutation = vi.fn()

const categoriesHandlers = [
    http.post('api/categories', () => HttpResponse.json(mockCategoryCreate)),

    http.get('api/categories', () => HttpResponse.json(mockCategories)),

    http.put('api/categories/:id', ({ params }) =>
        HttpResponse.json({
            id: params.id,
            message: 'Category updated successfully',
        })
    ),

    http.delete('api/categories/:id', () =>
        HttpResponse.json({ message: 'Category deleted successfully' })
    ),
]

export default categoriesHandlers
