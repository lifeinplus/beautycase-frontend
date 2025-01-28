import { type Product } from '../products'

export interface Lesson {
    _id?: string
    title: string
    shortDescription: string
    videoUrl: string
    fullDescription: string
    products?: Product[]
    selectedProductIds: string[]
}
