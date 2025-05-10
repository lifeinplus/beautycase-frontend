import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import type { MutationResult } from '../../../types/api'
import type { Store } from '../types'

export const mockStoreCreate: MutationResult = {
    id: 'store3',
    count: 1,
    message: 'Store created successfully',
}

export const mockStore: Store = { _id: '1', name: 'Brush' }

export const mockStores: Store[] = [mockStore, { _id: '2', name: 'Sponge' }]

export const useCreateStoreMutation = vi.fn()
export const useReadStoresQuery = vi.fn()
export const useUpdateStoreMutation = vi.fn()
export const useDeleteStoreMutation = vi.fn()

const storesHandlers = [
    http.post('api/stores', () => HttpResponse.json(mockStoreCreate)),

    http.get('api/stores', () => HttpResponse.json(mockStores)),

    http.put('api/stores/:id', async ({ params }) =>
        HttpResponse.json({
            id: params.id,
            message: 'Store updated successfully',
        })
    ),

    http.delete('api/stores/:id', () =>
        HttpResponse.json({ message: 'Store deleted successfully' })
    ),
]
export default storesHandlers
