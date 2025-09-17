import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import type { MutationResult } from '@/shared/api/types'
import type { Product } from '../../types'

export const mockProductCreate: MutationResult = {
    id: 'product3',
    message: 'Product created successfully',
}

export const mockProduct1: Product = {
    _id: 'product1',
    brand: { _id: 'brand1', name: 'Brand 1' },
    brandId: 'brand1',
    name: 'Product 1',
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

export const mockProduct2: Product = {
    _id: 'product2',
    brandId: 'brand2',
    name: 'Product 2',
    imageUrl: 'https://example.com/lipstick.jpg',
    comment: '',
    storeLinks: [],
}

export const mockProducts: Product[] = [mockProduct1, mockProduct2]

export const mockProductIds: string[] = ['product1', 'product2']

export const useCreateProductMutation = vi.fn()
export const useGetAllProductsQuery = vi.fn()
export const useGetProductByIdQuery = vi.fn()
export const useGetProductsByCategoryQuery = vi.fn()
export const useUpdateProductByIdMutation = vi.fn()
export const useUpdateProductStoreLinksMutation = vi.fn()
export const useDeleteProductByIdMutation = vi.fn()

const productsHandlers = [
    http.post('api/products', () => HttpResponse.json(mockProductCreate)),

    http.get('api/products', () => HttpResponse.json(mockProducts)),

    http.get('api/products/:id', ({ params }) => {
        const product = mockProducts.find((p) => p._id === params.id)
        return product
            ? HttpResponse.json(product)
            : HttpResponse.json(
                  { success: false, message: 'Product not found' },
                  { status: 404 }
              )
    }),

    http.get('api/products/category/:category', ({}) => {
        return HttpResponse.json(mockProducts)
    }),

    http.get('api/products/without-category', ({}) => {
        return HttpResponse.json(mockProducts)
    }),

    http.put('api/products/:id', async ({ params }) =>
        HttpResponse.json({
            id: params.id,
            message: 'Product updated successfully',
        })
    ),

    http.patch('api/products/:id/store-links', async ({ params }) =>
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
