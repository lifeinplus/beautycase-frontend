import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import type { MutationResult } from '@/shared/api/types'
import type { Brand } from '../../types'

export const mockBrandCreate: MutationResult = {
    id: 'brand3',
}

export const mockBrand1: Brand = {
    _id: 'brand1',
    name: 'Brand 1',
}

export const mockBrand2: Brand = {
    _id: 'brand2',
    name: 'Brand 2',
}

export const mockBrands: Brand[] = [mockBrand1, mockBrand2]

export const useCreateBrandMutation = vi.fn()
export const useGetAllBrandsQuery = vi.fn()
export const useUpdateBrandByIdMutation = vi.fn()
export const useDeleteBrandByIdMutation = vi.fn()

const brandsHandlers = [
    http.post('api/brands', () => HttpResponse.json(mockBrandCreate)),

    http.get('api/brands', () => HttpResponse.json(mockBrands)),

    http.put('api/brands/:id', ({ params }) =>
        HttpResponse.json({ id: params.id })
    ),

    http.delete('api/brands/:id', ({ params }) =>
        HttpResponse.json({ id: params.id })
    ),
]

export default brandsHandlers
