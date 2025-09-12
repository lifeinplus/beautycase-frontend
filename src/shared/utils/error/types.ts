export interface DataMessageError {
    data: {
        name: string
        message: string
        details?: string[]
        success?: boolean
    }
    status: number
}
