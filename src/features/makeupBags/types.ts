import { type Brand } from '../brands'
import { type Stage } from '../stages'

export interface MakeupBag {
    _id?: string
    createdAt?: string
    clientId: { username: string }
    brands: Brand[]
    stages: Stage[]
}
