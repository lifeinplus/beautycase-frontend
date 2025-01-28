import { type Brand } from '../brands'
import { type StoreLink } from '../stores'

export interface Product {
    _id?: string
    brand?: Pick<Brand, '_id' | 'name'>
    brandId: string
    name: string
    image: string
    shade?: string
    comment: string
    storeLinks: StoreLink[]
}
