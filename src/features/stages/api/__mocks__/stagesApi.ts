import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import { mockProduct1 } from '@/features/products/api/__mocks__/productsApi'
import type { MutationResult } from '@/shared/api/types'
import type { Stage } from '../../types'

export const mockStageCreate: MutationResult = {
    id: 'stage3',
}

export const mockStageDuplicate: MutationResult = {
    id: 'stage1-copy',
}

export const mockStage1: Stage = {
    _id: 'stage1',
    title: 'Base Makeup',
    subtitle: 'Applying foundation and concealer',
    imageId: 'stages/691c27584e28a506f9bdaebc/mijmxrn4ivqfbmdzwt5m',
    comment: 'Test Comment 1',
    steps: ['Step 1.1', 'Step 1.2', 'Step 1.3'],
    stepsText: 'Step 1.1\n\nStep 1.2\n\nStep 1.3',
    products: [mockProduct1],
    productIds: ['product1', 'product2'],
}

export const mockStage2: Stage = {
    _id: 'stage2',
    title: 'Eye Makeup',
    subtitle: 'Applying eyeshadow and eyeliner',
    imageId: 'stages/691c27584e28a506f9bdaebc/qsese5jgbrzcjoivnt1p',
    steps: ['Step 2.1', 'Step 2.2'],
    productIds: ['product3', 'product4'],
}

export const mockStages: Stage[] = [mockStage1, mockStage2]

export const useCreateStageMutation = vi.fn()
export const useDuplicateStageByIdMutation = vi.fn()
export const useGetAllStagesQuery = vi.fn()
export const useGetMineStagesQuery = vi.fn()
export const useGetStageByIdQuery = vi.fn()
export const useUpdateStageByIdMutation = vi.fn()
export const useUpdateStageProductsMutation = vi.fn()
export const useDeleteStageByIdMutation = vi.fn()

const stagesHandlers = [
    http.post('api/stages', () => HttpResponse.json(mockStageCreate)),

    http.post('api/stages/duplicate/:id', ({ params }) =>
        HttpResponse.json({ ...mockStageDuplicate, id: `${params.id}-copy` })
    ),

    http.get('api/stages', () => HttpResponse.json(mockStages)),

    http.get('api/stages/mine', () => HttpResponse.json(mockStages)),

    http.get('api/stages/:id', ({ params }) => {
        const stage = mockStages.find((s) => s._id === params.id)
        return stage
            ? HttpResponse.json(stage)
            : HttpResponse.json({ success: false }, { status: 404 })
    }),

    http.put('api/stages/:id', async ({ params }) =>
        HttpResponse.json({ id: params.id })
    ),

    http.patch('api/stages/:id/products', async ({ params }) =>
        HttpResponse.json({ id: params.id })
    ),

    http.delete('api/stages/:id', ({ params }) =>
        HttpResponse.json({ id: params.id })
    ),
]

export default stagesHandlers
