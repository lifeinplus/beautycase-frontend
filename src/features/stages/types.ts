import type { Product } from '../products'

export interface Stage {
    _id?: string
    createdAt?: string
    title: string
    subtitle: string
    image: string
    steps: string[]
    productIds: Product[]
    selectedProductIds?: string[]
}
