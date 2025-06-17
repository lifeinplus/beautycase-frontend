import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import type { MutationResult } from '../../../types/api'
import { mockCategory1 } from '../../categories/__mocks__/categoriesApi'
import { mockStage1, mockStages } from '../../stages/__mocks__/stagesApi'
import { mockTool1, mockTools } from '../../tools/__mocks__/toolsApi'
import type { MakeupBag, MakeupBagData } from '../types'

export const mockMakeupBagCreate: MutationResult = {
    id: 'makeupBag3',
    message: 'MakeupBag created successfully',
}

export const mockMakeupBagPDFData: MakeupBagData = {
    category: mockCategory1,
    stages: mockStages,
    tools: mockTools,
}

export const mockMakeupBag1: MakeupBag = {
    _id: 'makeupBag1',
    createdAt: '2025-04-10T10:00:00Z',
    category: { _id: 'category1', name: 'Test Category 1' },
    categoryId: 'category1',
    client: { _id: 'client1', username: 'Test Client 1' },
    clientId: 'client1',
    stages: [mockStage1],
    stageIds: ['stage1', 'stage2'],
    tools: [mockTool1],
    toolIds: ['tool1', 'tool2', 'tool3'],
}

export const mockMakeupBag2: MakeupBag = {
    _id: 'makeupBag2',
    createdAt: '2025-04-20T12:30:00Z',
    categoryId: 'category2',
    clientId: 'client2',
    stageIds: ['stage3', 'stage4'],
    toolIds: ['tool4', 'tool5', 'tool6'],
}

export const mockMakeupBags: MakeupBag[] = [mockMakeupBag1, mockMakeupBag2]

export const useCreateMakeupBagMutation = vi.fn()
export const useGetAllMakeupBagsQuery = vi.fn()
export const useGetMakeupBagByIdQuery = vi.fn()
export const useUpdateMakeupBagByIdMutation = vi.fn()
export const useDeleteMakeupBagByIdMutation = vi.fn()

const makeupBagsHandlers = [
    http.post('api/makeup-bags', () => HttpResponse.json(mockMakeupBagCreate)),

    http.get('api/makeup-bags', () => HttpResponse.json(mockMakeupBags)),

    http.get('api/makeup-bags/:id', ({ params }) => {
        const makeupBag = mockMakeupBags.find((p) => p._id === params.id)
        return makeupBag
            ? HttpResponse.json(makeupBag)
            : HttpResponse.json(
                  { success: false, message: 'MakeupBag not found' },
                  { status: 404 }
              )
    }),

    http.put('api/makeup-bags/:id', async ({ params }) =>
        HttpResponse.json({
            id: params.id,
            message: 'MakeupBag updated successfully',
        })
    ),

    http.delete('api/makeup-bags/:id', () =>
        HttpResponse.json({ message: 'MakeupBag deleted successfully' })
    ),
]

export default makeupBagsHandlers
