import { type Brand } from '../brands'
import { type StoreLink } from '../stores'

export interface Product {
    _id: string
    name: string
    brandId?: Pick<Brand, '_id' | 'name'>
    image: string
    shade: string
    comment: string
    storeLinks?: StoreLink[]
}
