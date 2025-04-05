import type { Brand } from '../brands/types'
import type { StoreLink } from '../stores/types'

export interface Product {
    _id?: string
    brand?: Pick<Brand, '_id' | 'name'>
    brandId: string
    name: string
    imageUrl: string
    shade?: string
    comment: string
    storeLinks: StoreLink[]
}
