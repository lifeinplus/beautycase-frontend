import { http, HttpResponse } from 'msw'
import type { Tool } from '../../../features/tools/types'

export const mockTool: Tool = {
    _id: '1',
    name: 'Brush',
    brandId: '11',
    imageUrl: 'https://example.com/1.webp',
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
        _id: '2',
        name: 'Sponge',
        brandId: '22',
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

export const toolsHandlers = [
    http.post('api/tools/one', () =>
        HttpResponse.json({
            count: 1,
            id: 3,
            message: 'Tool added successfully',
        })
    ),

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
