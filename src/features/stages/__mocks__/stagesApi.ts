import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import type { MutationResult } from '../../../shared/types/api'
import { mockProduct1 } from '../../products/__mocks__/productsApi'
import type { Stage } from '../types'

export const mockStageCreate: MutationResult = {
    id: 'stage3',
    message: 'Stage created successfully',
}

export const mockStageDuplicate: MutationResult = {
    id: 'stage1-copy',
    message: 'Stage duplicated successfully',
}

export const mockStage1: Stage = {
    _id: 'stage1',
    title: 'Base Makeup',
    subtitle: 'Applying foundation and concealer',
    imageUrl: 'https://example.com/image1.jpg',
    comment: 'Test Comment 1',
    steps: ['Step 1.1', 'Step 1.2', 'Step 1.3'],
    stepsText: 'Step 1.1\n\nStep 1.2\n\nStep 1.3',
    products: [mockProduct1],
    productIds: ['111', '222'],
}

export const mockStage2: Stage = {
    _id: 'stage2',
    title: 'Eye Makeup',
    subtitle: 'Applying eyeshadow and eyeliner',
    imageUrl: 'https://example.com/image2.jpg',
    steps: ['Step 2.1', 'Step 2.2'],
    productIds: ['333', '444'],
}

export const mockStages: Stage[] = [mockStage1, mockStage2]

export const useCreateStageMutation = vi.fn()
export const useDuplicateStageByIdMutation = vi.fn()
export const useGetAllStagesQuery = vi.fn()
export const useGetStageByIdQuery = vi.fn()
export const useUpdateStageByIdMutation = vi.fn()
export const useDeleteStageByIdMutation = vi.fn()

const stagesHandlers = [
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

export default stagesHandlers
