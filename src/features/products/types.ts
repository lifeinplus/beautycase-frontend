import { Brand } from '../brands'

export interface ProductStore {
    _id?: string
    name?: string
    link?: string
}

export interface Product {
    _id: string
    name: string
    brandId?: Pick<Brand, '_id' | 'name'>
    image: string
    stores?: ProductStore[]
}
