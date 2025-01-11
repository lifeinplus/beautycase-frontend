import { type MakeupBag } from '../makeupBags'

export interface User {
    _id: string
    role: string
    username: string
    beautyBags?: string[]
    lessons?: string[]
}

export interface UserResult {
    user: User
    makeupBags?: MakeupBag[]
}
