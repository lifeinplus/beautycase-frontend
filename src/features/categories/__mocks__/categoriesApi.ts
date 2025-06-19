import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import type { Category } from '../types'

export const mockCategory1: Category = {
    _id: 'category1',
    name: 'Category 1',
    type: 'test_type',
}

export const mockCategory2: Category = {
    _id: 'category2',
    name: 'Category 2',
    type: 'test_type',
}

export const mockCategories: Category[] = [mockCategory1, mockCategory2]

export const useGetAllCategoriesQuery = vi.fn()

const categoriesHandlers = [
    http.get('api/categories', () => HttpResponse.json(mockCategories)),
]

export default categoriesHandlers
