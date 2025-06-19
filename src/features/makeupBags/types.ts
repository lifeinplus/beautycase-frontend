import type { Category } from '../categories/types'
import type { Stage } from '../stages/types'
import type { Tool } from '../tools/types'
import type { User } from '../users/types'

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
    category?: {
        name: string
    }
    stages?: Stage[]
    tools?: Tool[]
}
