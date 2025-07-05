import type { Brand } from '@/features/brands/types'
import type { StoreLink } from '@/features/stores/types'

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
