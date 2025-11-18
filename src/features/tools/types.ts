import type { Brand } from '@/features/brands/types'
import type { StoreLink } from '@/features/stores/types'

export interface Tool {
    _id?: string
    brand?: Pick<Brand, '_id' | 'name'>
    brandId: string
    name: string
    imageIds: string[]
    number?: string
    comment: string
    storeLinks?: StoreLink[]
}
