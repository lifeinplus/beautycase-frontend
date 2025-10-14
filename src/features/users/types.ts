import type { Category } from '@/features/categories/types'

export interface User {
    _id: string
    createdAt?: string
    updatedAt?: string
    role: string
    username: string
    makeupBags?: string[]
    lessons?: string[]
}

export interface UserMakeupBag {
    _id: string
    category: Pick<Category, 'name'>
}

export interface UserLesson {
    _id: string
    title: string
}

export interface UserResult {
    user: User
    makeupBags?: UserMakeupBag[]
    lessons?: UserLesson[]
}
