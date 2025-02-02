import { type Brand } from '../brands'
import { type StoreLink } from '../stores'

interface ImageData {
    id?: string
    url?: string
    version?: number
}

export interface Product {
    _id?: string
    brand?: Pick<Brand, '_id' | 'name'>
    brandId: string
    name: string
    imageData?: ImageData
    imageFile?: File
    imageUrl?: string
    shade?: string
    comment: string
    storeLinks: StoreLink[]
}
