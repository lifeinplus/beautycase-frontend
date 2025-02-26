import type { Product } from '../products'

export interface Stage {
    _id?: string
    createdAt?: string
    title: string
    subtitle: string
    imageUrl: string
    comment?: string
    steps?: string[]
    stepsText?: string
    products?: Product[]
    productIds: string[]
}
