import { http, HttpResponse } from 'msw'

import { type User } from '../features/users'

export const mockUsers: User[] = [
    { _id: '1', role: 'admin', username: 'John Doe' },
    { _id: '2', role: 'mua', username: 'Jane Smith' },
]

export const mockUser: User = { _id: '1', role: 'admin', username: 'John Doe' }

export const handlers = [
    http.get('api/users/all', async () => HttpResponse.json(mockUsers)),

    http.get('api/users/:id', async ({ params }) => {
        const user = mockUsers.find((user) => user._id === params.id)
        return user ? HttpResponse.json(user) : HttpResponse.error()
    }),
]
