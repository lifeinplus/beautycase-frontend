import { type Brand } from '../brands'
import { type Store } from '../stores'

export interface Product {
    _id: string
    name: string
    brandId?: Pick<Brand, '_id' | 'name'>
    image: string
    stores?: Store[]
}
