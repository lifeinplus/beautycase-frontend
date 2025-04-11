import type { Product } from '../products/types'

export interface Lesson {
    _id?: string
    title: string
    shortDescription: string
    videoUrl: string
    fullDescription: string
    products?: Product[]
    productIds: string[]
}
