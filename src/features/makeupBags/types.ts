import type { Category } from '@/features/categories/types'
import type { Stage } from '@/features/stages/types'
import type { Tool } from '@/features/tools/types'
import type { User } from '@/features/users/types'

export interface MakeupBag {
    _id?: string
    createdAt?: string
    category?: Pick<Category, '_id' | 'name'>
    categoryId: string
    client?: Pick<User, '_id' | 'username'>
    clientId: string
    stages?: Stage[]
    stageIds: string[]
    tools?: Tool[]
    toolIds: string[]
}

export interface MakeupBagData {
    category?: Pick<Category, 'name'>
    stages?: Stage[]
    tools?: Tool[]
}
