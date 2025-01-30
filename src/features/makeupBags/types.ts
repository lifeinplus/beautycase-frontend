import { type Category } from '../categories'
import { type Stage } from '../stages'
import { type Tool } from '../tools'
import { type User } from '../users'

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
