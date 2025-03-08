import { http, HttpResponse } from 'msw'

import { type User } from '../features/users'
import { type Tool } from '../features/tools'

export const mockTool: Tool = {
    _id: '1',
    name: 'Brush',
    brandId: '11',
    imageUrl: 'https://pcdn.com/1.webp',
    comment: 'Perfect',
    storeLinks: [
        {
            _id: '111',
            name: 'ManlyPRO',
            link: 'https://manly.com/111',
        },
    ],
}

export const mockTools: Tool[] = [
    {
        _id: '1',
        name: 'Brush',
        brandId: '11',
        imageUrl: 'https://pcdn.com/1.webp',
        comment: 'Perfect',
        storeLinks: [
            {
                _id: '111',
                name: 'ManlyPRO',
                link: 'https://manly.com/111',
            },
        ],
    },
    {
        _id: '2',
        name: 'Sponge',
        brandId: '22',
        imageUrl: 'https://pcdn.com/2.webp',
        comment: 'Best',
        storeLinks: [
            {
                _id: '222',
                name: 'ManlyPRO',
                link: 'https://manly.com/222',
            },
        ],
    },
]

export const mockUsers: User[] = [
    { _id: '1', role: 'admin', username: 'John Doe' },
    { _id: '2', role: 'mua', username: 'Jane Smith' },
]

export const mockUser: User = { _id: '1', role: 'admin', username: 'John Doe' }

export const handlers = [
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

    http.post('api/tools/one', () =>
        HttpResponse.json({
            count: 1,
            id: 3,
            message: 'Tool added successfully',
        })
    ),

    http.put('api/tools/:id', async ({ params }) =>
        HttpResponse.json({
            id: params.id,
            message: 'Tool successfully changed',
        })
    ),

    http.delete('api/tools/:id', () =>
        HttpResponse.json({ message: 'Tool successfully deleted' })
    ),

    http.post('api/uploads/image-temp', async () => {
        return HttpResponse.json({ imageUrl: 'https://example.com/image.jpg' })
    }),

    http.get('api/users/all', async () => HttpResponse.json(mockUsers)),

    http.get('api/users/:id', async ({ params }) => {
        const user = mockUsers.find((user) => user._id === params.id)
        return user ? HttpResponse.json(user) : HttpResponse.error()
    }),
]
