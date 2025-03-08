import { http, HttpResponse } from 'msw'

import { type User } from '../../features/users'

export const mockUsers: User[] = [
    { _id: '1', role: 'admin', username: 'Admin' },
    { _id: '2', role: 'mua', username: 'Inna' },
]

export const mockUser: User = { ...mockUsers[0] }

export const usersHandlers = [
    http.get('api/users/all', async () => HttpResponse.json(mockUsers)),

    http.get('api/users/:id', async ({ params }) => {
        const user = mockUsers.find((user) => user._id === params.id)
        return user ? HttpResponse.json(user) : HttpResponse.error()
    }),
]
