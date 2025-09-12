import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import type { MutationResult } from '@/shared/api/types'
import type { Tool } from '../../types'

export const mockToolCreate: MutationResult = {
    id: 'tool3',
    message: 'Tool added successfully',
}

export const mockTool1: Tool = {
    _id: 'tool1',
    name: 'Tool 1',
    brand: { _id: 'brand1', name: 'Brand 1' },
    brandId: 'brand1',
    imageUrl: 'https://example.com/1.webp',
    number: '123',
    comment: 'Perfect',
    storeLinks: [
        {
            _id: 'store1',
            name: 'ManlyPRO',
            link: 'https://example.com/1',
        },
    ],
}

export const mockTool2: Tool = {
    _id: 'tool2',
    name: 'Tool 2',
    brand: { _id: 'brand2', name: 'Brand 2' },
    brandId: 'brand2',
    imageUrl: 'https://example.com/2.webp',
    comment: 'Best',
    storeLinks: [
        {
            _id: 'store2',
            name: 'ManlyPRO',
            link: 'https://example.com/2',
        },
    ],
}

export const mockTool3: Tool = {
    _id: 'tool3',
    name: 'Tool 3',
    brand: { _id: 'brand3', name: 'Brand 3' },
    brandId: 'brand3',
    imageUrl: 'https://example.com/3.webp',
    comment: 'Best',
    storeLinks: [
        {
            _id: 'store3',
            name: 'ManlyPRO',
            link: 'https://example.com/3',
        },
    ],
}

export const mockTools: Tool[] = [mockTool1, mockTool2, mockTool3]

export const useCreateToolMutation = vi.fn()
export const useGetAllToolsQuery = vi.fn()
export const useGetToolByIdQuery = vi.fn()
export const useDeleteToolByIdMutation = vi.fn()
export const useUpdateToolByIdMutation = vi.fn()
export const useUpdateToolStoreLinksMutation = vi.fn()

const toolsHandlers = [
    http.post('api/tools', () => HttpResponse.json(mockToolCreate)),

    http.get('api/tools', () => HttpResponse.json(mockTools)),

    http.get('api/tools/:id', ({ params }) => {
        const tool = mockTools.find((t) => t._id === params.id)
        return tool
            ? HttpResponse.json(tool)
            : HttpResponse.json(
                  { success: false, message: 'Tool not found' },
                  { status: 404 }
              )
    }),

    http.put('api/tools/:id', async ({ params }) =>
        HttpResponse.json({
            id: params.id,
            message: 'Tool successfully changed',
        })
    ),

    http.delete('api/tools/:id', () =>
        HttpResponse.json({ message: 'Tool successfully deleted' })
    ),
]

export default toolsHandlers
