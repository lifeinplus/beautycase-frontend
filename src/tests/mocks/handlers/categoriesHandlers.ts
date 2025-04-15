import { http, HttpResponse } from 'msw'

import type { Category } from '../../../features/categories/types'

const mockCategory: Category = {
    _id: 'category1',
    name: 'Category 1',
    type: 'test_type',
}

export const mockCategories: Category[] = [
    mockCategory,
    {
        _id: 'category2',
        name: 'Category 2',
        type: 'test_type',
    },
]

export const categoriesHandlers = [
    http.get('api/categories/all', () => HttpResponse.json(mockCategories)),
]
