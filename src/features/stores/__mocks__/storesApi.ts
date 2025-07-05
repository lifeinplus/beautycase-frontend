import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import type { MutationResult } from '../../../shared/types/api'
import type { Store } from '../types'

export const mockStoreCreate: MutationResult = {
    id: 'store3',
    message: 'Store created successfully',
}

export const mockStore1: Store = { _id: '1', name: 'Brush' }

export const mockStore2: Store = { _id: '2', name: 'Sponge' }

export const mockStores: Store[] = [mockStore1, mockStore2]

export const useCreateStoreMutation = vi.fn()
export const useGetAllStoresQuery = vi.fn()
export const useUpdateStoreByIdMutation = vi.fn()
export const useDeleteStoreByIdMutation = vi.fn()

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
