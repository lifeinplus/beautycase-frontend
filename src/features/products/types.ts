import { type Brand } from '../brands'
import { type StoreLink } from '../stores'

export interface Product {
    _id?: string
    brand?: Pick<Brand, '_id' | 'name'>
    brandId: string
    comment: string
    image: string
    name: string
    shade?: string
    storeLinks: StoreLink[]
}
