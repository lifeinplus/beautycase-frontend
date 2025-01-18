import { type Brand } from '../brands'
import { type StoreLink } from '../stores'

export interface Tool {
    _id?: string
    brandId: Brand
    name: string
    image: string
    number?: string
    comment?: string
    storeLinks?: StoreLink[]
}
