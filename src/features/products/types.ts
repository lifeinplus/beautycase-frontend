export interface Product {
    _id?: string
    name: string
    image: string
    buy: string
}

export interface MutationResult {
    count: number
    id: string
    message: string
}

export interface QueryResult {
    message: string
}
