import { http, HttpResponse } from 'msw'

import type { User, UserResult } from '../../../features/users/types'

export const mockUser: User = {
    _id: 'user1',
    role: 'admin',
    username: 'Admin',
}

export const mockUsers: User[] = [
    mockUser,
    { _id: 'user2', role: 'mua', username: 'Inna' },
]

export const mockUserResult: UserResult = {
    user: mockUser,
    makeupBags: [
        {
            _id: 'makeupBag1',
            category: { name: 'Daily Makeup' },
        },
        {
            _id: 'makeupBag2',
            category: { name: 'Evening Makeup' },
        },
    ],
}

export const usersHandlers = [
    http.get('api/users/all', async () => HttpResponse.json(mockUsers)),

    http.get('api/users/:id', async ({ params }) => {
        return mockUserResult.user._id === params.id
            ? HttpResponse.json(mockUserResult)
            : HttpResponse.error()
    }),
]
