import { Brand } from '../brands'

export interface Product {
    _id: string
    name: string
    brandId?: Pick<Brand, '_id' | 'name'>
    image: string
    buy: string
}
