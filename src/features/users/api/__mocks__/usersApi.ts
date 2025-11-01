import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import type { User, UserMakeupBag, UserResult } from '../../types'

export const mockUser1: User = {
    _id: 'user1',
    role: 'admin',
    firstName: 'Alice',
    lastName: 'Smith',
    username: 'Alice',
}

export const mockUser2: User = {
    _id: 'user2',
    role: 'mua',
    firstName: 'Bob',
    lastName: 'Johnson',
    username: 'Bob',
}

export const mockUsers: User[] = [mockUser1, mockUser2]

export const mockUserMakeupBag1: UserMakeupBag = {
    _id: 'makeupBag1',
    category: { name: 'basic' },
}

export const mockUserMakeupBag2: UserMakeupBag = {
    _id: 'makeupBag2',
    category: { name: 'luxury' },
}

export const mockUserLesson1 = { _id: 'lesson1', title: 'Lesson One' }
export const mockUserLesson2 = { _id: 'lesson2', title: 'Lesson Two' }

export const mockUserResult: UserResult = {
    user: mockUser1,
    makeupBags: [mockUserMakeupBag1, mockUserMakeupBag2],
    lessons: [mockUserLesson1, mockUserLesson2],
}

export const useGetAllUsersQuery = vi.fn()
export const useGetUserByIdQuery = vi.fn()
export const useDeleteUserByIdMutation = vi.fn()

const usersHandlers = [
    http.get('api/users', async () => HttpResponse.json(mockUsers)),

    http.get('api/users/:id', async ({ params }) => {
        return mockUserResult.user._id === params.id
            ? HttpResponse.json(mockUserResult)
            : HttpResponse.error()
    }),
]

export default usersHandlers
