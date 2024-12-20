export interface Tool {
    _id?: string
    name: string
    image: string
    number?: string
    comment?: string
}

export interface MutationResult {
    count: number
    id: string
    message: string
}

export interface QueryResult {
    message: string
}
