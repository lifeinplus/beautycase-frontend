import type { Product } from '@/features/products/types'

export interface Stage {
    _id?: string
    createdAt?: string
    title: string
    subtitle: string
    imageId: string
    comment?: string
    steps?: string[]
    stepsText?: string
    products?: Product[]
    productIds?: string[]
}
