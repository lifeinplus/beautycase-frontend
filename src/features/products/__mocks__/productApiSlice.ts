import { http, HttpResponse } from 'msw'

import type { MutationResult } from '../../../types/api'
import type { Product } from '../types'

export const mockProductCreate: MutationResult = {
    id: 'product3',
    count: 1,
    message: 'Product created successfully',
}

export const mockProduct: Product = {
    _id: 'product1',
    brandId: 'brand1',
    name: 'Liquid Foundation',
    imageUrl: 'https://example.com/foundation.jpg',
    shade: 'Natural Beige',
    comment: 'Long-lasting, natural finish',
    storeLinks: [
        {
            _id: 'store1',
            name: 'Store 1',
            link: 'https://store1.com/foundation',
        },
    ],
}

export const mockProducts: Product[] = [
    mockProduct,
    {
        _id: 'product2',
        brandId: 'brand2',
        name: 'Lipstick',
        imageUrl: 'https://example.com/lipstick.jpg',
        comment: '',
        storeLinks: [],
    },
]

const productsHandlers = [
    http.post('api/products/one', () => HttpResponse.json(mockProductCreate)),

    http.get('api/products/all', () => HttpResponse.json(mockProducts)),

    http.get('api/products/:id', ({ params }) => {
        const product = mockProducts.find((p) => p._id === params.id)
        return product
            ? HttpResponse.json(product)
            : HttpResponse.json(
                  { success: false, message: 'Product not found' },
                  { status: 404 }
              )
    }),

    http.put('api/products/:id', async ({ params }) =>
        HttpResponse.json({
            id: params.id,
            message: 'Product updated successfully',
        })
    ),

    http.delete('api/products/:id', () =>
        HttpResponse.json({ message: 'Product deleted successfully' })
    ),
]

export default productsHandlers
