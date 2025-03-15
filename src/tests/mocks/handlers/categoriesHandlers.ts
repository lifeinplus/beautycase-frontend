import { http, HttpResponse } from 'msw'
import { type Category } from '../../../features/categories'

export const mockCategories: Category[] = [
    {
        _id: '1',
        name: 'Category1',
        type: 'Type1',
    },
    {
        _id: '2',
        name: 'Category2',
        type: 'Type2',
    },
]

export const categoriesHandlers = [
    http.get('api/categories/all', () => HttpResponse.json(mockCategories)),
]
