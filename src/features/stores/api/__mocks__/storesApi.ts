import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import type { MutationResult } from '@/shared/api/types'
import type { Store } from '../../types'

export const mockStoreCreate: MutationResult = {
    id: 'store3',
}

export const mockStore1: Store = { _id: 'store1', name: 'Store 1' }

export const mockStore2: Store = { _id: 'store2', name: 'Store 2' }

export const mockStores: Store[] = [mockStore1, mockStore2]

export const mockStoreLink1 = {
    _id: 'store1',
    name: 'Store 1',
    link: 'https://store1.com',
}

export const mockStoreLink2 = {
    _id: 'store2',
    name: 'Store 2',
    link: 'https://store2.com',
}

export const mockStoreLinks = [mockStoreLink1, mockStoreLink2]

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
