import { http, HttpResponse } from 'msw'
import type { Brand } from '../../../features/brands/types'
import type { MutationResult } from '../../../types/api'

export const mockBrandCreate: MutationResult = {
    id: 'brand3',
    count: 1,
    message: 'Brand created successfully',
}

export const mockBrand: Brand = {
    _id: 'brand1',
    name: 'Brand 1',
}

export const mockBrands: Brand[] = [
    mockBrand,
    {
        _id: 'brand2',
        name: 'Brand 2',
    },
]

export const brandsHandlers = [
    http.post('api/brands', () => HttpResponse.json(mockBrandCreate)),

    http.get('api/brands', () => HttpResponse.json(mockBrands)),

    http.put('api/brands/:id', ({ params }) =>
        HttpResponse.json({
            id: params.id,
            message: 'Brand updated successfully',
        })
    ),

    http.delete('api/brands/:id', () =>
        HttpResponse.json({ message: 'Brand deleted successfully' })
    ),
]
