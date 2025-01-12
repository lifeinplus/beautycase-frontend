import { type Category } from '../categories'
import { type Stage } from '../stages'
import { type Tool } from '../tools'
import { type User } from '../users'

export interface MakeupBag {
    _id?: string
    createdAt?: string
    categoryId: Pick<Category, '_id' | 'name'>
    clientId: Pick<User, '_id' | 'username'>
    selectedStageIds: string[]
    selectedToolIds: string[]
    stageIds: Stage[]
    toolIds: Tool[]
}
