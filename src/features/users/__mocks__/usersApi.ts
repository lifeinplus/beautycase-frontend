import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import type { User, UserResult } from '../types'

export const mockUser1: User = {
    _id: 'user1',
    role: 'admin',
    username: 'Admin',
}

export const mockUser2: User = {
    _id: 'user2',
    role: 'mua',
    username: 'Inna',
}

export const mockUsers: User[] = [mockUser1, mockUser2]

export const mockUserResult: UserResult = {
    user: mockUser1,
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

export const mockUseGetUserByIdQuery = vi.fn()

export const useGetAllUsersQuery = vi.fn()
export const useGetUserByIdQuery = () => mockUseGetUserByIdQuery()

const usersHandlers = [
    http.get('api/users', async () => HttpResponse.json(mockUsers)),

    http.get('api/users/:id', async ({ params }) => {
        return mockUserResult.user._id === params.id
            ? HttpResponse.json(mockUserResult)
            : HttpResponse.error()
    }),
]

export default usersHandlers
