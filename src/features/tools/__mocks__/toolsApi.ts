import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import type { MutationResult } from '../../../types/api'
import type { Tool } from '../types'

export const mockToolCreate: MutationResult = {
    id: 'tool3',
    count: 1,
    message: 'Tool added successfully',
}

export const mockTool: Tool = {
    _id: 'tool1',
    name: 'Tool 1',
    brand: { _id: 'brand1', name: 'Brand 1' },
    brandId: 'brand1',
    imageUrl: 'https://example.com/1.webp',
    number: '123',
    comment: 'Perfect',
    storeLinks: [
        {
            _id: '111',
            name: 'ManlyPRO',
            link: 'https://example.com/111',
        },
    ],
}

export const mockTools: Tool[] = [
    mockTool,
    {
        _id: 'tool2',
        name: 'Tool 2',
        brandId: 'brand2',
        imageUrl: 'https://example.com/2.webp',
        comment: 'Best',
        storeLinks: [
            {
                _id: '222',
                name: 'ManlyPRO',
                link: 'https://example.com/222',
            },
        ],
    },
]

export const useAddToolMutation = vi.fn()
export const useDeleteToolMutation = vi.fn()
export const useEditToolMutation = vi.fn()
export const useGetToolByIdQuery = vi.fn()
export const useGetToolsQuery = vi.fn()

const toolsHandlers = [
    http.post('api/tools/one', () => HttpResponse.json(mockToolCreate)),

    http.get('api/tools/all', () => HttpResponse.json(mockTools)),

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
