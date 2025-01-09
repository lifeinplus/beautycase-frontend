import { type Brand } from '../brands'

export interface Tool {
    _id?: string
    brandId: Brand
    name: string
    image: string
    number?: string
    comment?: string
}
