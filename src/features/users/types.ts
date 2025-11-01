import type { Category } from '@/features/categories/types'

export interface User {
    _id: string
    role: string
    firstName: string
    lastName: string
    username: string
    makeupBags?: string[]
    lessons?: string[]
    createdAt?: string
    updatedAt?: string
}

export interface Mua {
    _id: string
    firstName: string
    lastName: string
    username: string
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
