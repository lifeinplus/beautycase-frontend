import { type Stage } from '../stages'
import { type Tool } from '../tools'

export interface MakeupBag {
    _id?: string
    createdAt?: string
    clientId: { username: string }
    selectedStageIds: string[]
    selectedToolIds: string[]
    stageIds: Stage[]
    toolIds: Tool[]
}
