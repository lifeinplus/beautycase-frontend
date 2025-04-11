import { http, HttpResponse } from 'msw'
import type { Stage } from '../../../features/stages/types'

export const mockStage: Stage = {
    _id: '1',
    title: 'Base Makeup',
    subtitle: 'Applying foundation and concealer',
    imageUrl: 'https://example.com/image.jpg',
    productIds: ['111', '222'],
}

export const mockStages: Stage[] = [
    mockStage,
    {
        _id: '2',
        title: 'Eye Makeup',
        subtitle: 'Applying eyeshadow and eyeliner',
        imageUrl: 'https://example.com/image.jpg',
        productIds: ['333', '444'],
    },
]

export const stagesHandlers = [
    http.post('api/stages', () =>
        HttpResponse.json({
            count: 1,
            id: 3,
            message: 'Stage created successfully',
        })
    ),

    http.post('api/stages/duplicate/:id', ({ params }) =>
        HttpResponse.json({
            count: 1,
            id: `${params.id}-copy`,
            message: 'Stage duplicated successfully',
        })
    ),

    http.get('api/stages', () => HttpResponse.json(mockStages)),

    http.get('api/stages/:id', ({ params }) => {
        const stage = mockStages.find((s) => s._id === params.id)
        return stage
            ? HttpResponse.json(stage)
            : HttpResponse.json(
                  { success: false, message: 'Stage not found' },
                  { status: 404 }
              )
    }),

    http.put('api/stages/:id', async ({ params }) =>
        HttpResponse.json({
            id: params.id,
            message: 'Stage updated successfully',
        })
    ),

    http.delete('api/stages/:id', () =>
        HttpResponse.json({ message: 'Stage deleted successfully' })
    ),
]
