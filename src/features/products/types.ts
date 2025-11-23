import type { Brand } from '@/features/brands/types'
import type { StoreLink } from '@/features/stores/types'
import type { Category } from '../categories/types'

export interface Product {
    _id?: string
    brand?: Pick<Brand, '_id' | 'name'>
    brandId: string
    category?: Pick<Category, '_id' | 'name'>
    categoryId: string
    name: string
    imageIds: string[]
    shade?: string
    comment: string
    storeLinks?: StoreLink[]
}
