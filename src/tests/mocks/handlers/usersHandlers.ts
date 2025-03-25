import { http, HttpResponse } from 'msw'

import { type UserResult, type User } from '../../../features/users'

export const mockUserResult: UserResult = {
    user: {
        _id: '1',
        role: 'admin',
        username: 'Admin',
    },
    makeupBags: [
        {
            _id: '1',
            category: { name: 'Daily Makeup' },
        },
        {
            _id: '2',
            category: { name: 'Evening Makeup' },
        },
    ],
}

export const mockUsers: User[] = [
    mockUserResult.user,
    { _id: '2', role: 'mua', username: 'Inna' },
]

export const usersHandlers = [
    http.get('api/users/all', async () => HttpResponse.json(mockUsers)),

    http.get('api/users/:id', async ({ params }) => {
        return mockUserResult.user._id === params.id
            ? HttpResponse.json(mockUserResult)
            : HttpResponse.error()
    }),
]
