import { http, HttpResponse } from 'msw'
import type { Store } from '../../../features/stores/types'

export const mockStore: Store = { _id: '1', name: 'Brush' }

export const mockStores: Store[] = [mockStore, { _id: '2', name: 'Sponge' }]

export const storesHandlers = [
    http.post('api/stores', () =>
        HttpResponse.json({
            count: 1,
            id: 3,
            message: 'Store created successfully',
        })
    ),

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
