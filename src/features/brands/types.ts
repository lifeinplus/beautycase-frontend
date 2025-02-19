import { type Tool } from '../tools'

export interface Brand {
    _id: string
    name: string
    toolIds?: Partial<Tool>[]
}
