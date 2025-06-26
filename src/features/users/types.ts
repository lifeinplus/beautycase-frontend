export interface User {
    _id: string
    role: string
    username: string
    beautyBags?: string[]
    lessons?: string[]
}

export interface UserMakeupBag {
    _id: string
    category: { name: string }
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
