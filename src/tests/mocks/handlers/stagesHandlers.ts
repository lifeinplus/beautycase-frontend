import { http, HttpResponse } from 'msw'

import type { Stage } from '../../../features/stages/types'
import type { MutationResult } from '../../../types/api'

export const mockStageCreate: MutationResult = {
    id: 'stage3',
    count: 1,
    message: 'Stage created successfully',
}

export const mockStageDuplicate: MutationResult = {
    id: 'stage1-copy',
    count: 1,
    message: 'Stage duplicated successfully',
}

export const mockStage: Stage = {
    _id: 'stage1',
    title: 'Base Makeup',
    subtitle: 'Applying foundation and concealer',
    imageUrl: 'https://example.com/image.jpg',
    productIds: ['111', '222'],
}

export const mockStages: Stage[] = [
    mockStage,
    {
        _id: 'stage2',
        title: 'Eye Makeup',
        subtitle: 'Applying eyeshadow and eyeliner',
        imageUrl: 'https://example.com/image.jpg',
        productIds: ['333', '444'],
    },
]

export const stagesHandlers = [
    http.post('api/stages', () => HttpResponse.json(mockStageCreate)),

    http.post('api/stages/duplicate/:id', ({ params }) =>
        HttpResponse.json({ ...mockStageDuplicate, id: `${params.id}-copy` })
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
