import { type Product } from '../products'

export interface Lesson {
    _id?: string
    title: string
    shortDescription: string
    videoUrl: string
    fullDescription: string
    productIds?: Product[]
    selectedProductIds?: string[]
}
