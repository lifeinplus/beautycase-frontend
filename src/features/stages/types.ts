import type { Product } from '../products'

export interface Stage {
    _id?: string
    createdAt?: string
    title: string
    subtitle: string
    image: string
    steps?: string[]
    stepsText: string
    products?: Product[]
    selectedProductIds: string[]
}
