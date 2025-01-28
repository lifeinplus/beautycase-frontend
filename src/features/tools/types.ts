import { type Brand } from '../brands'
import { type StoreLink } from '../stores'

export interface Tool {
    _id?: string
    brand?: Pick<Brand, '_id' | 'name'>
    brandId: string
    name: string
    image: string
    number?: string
    comment: string
    storeLinks: StoreLink[]
}
