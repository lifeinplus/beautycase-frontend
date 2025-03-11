import { http, HttpResponse } from 'msw'
import { type Product } from '../../features/products'

export const mockProduct: Product = {
    _id: '1',
    brandId: 'brand-1',
    name: 'Liquid Foundation',
    imageUrl: 'https://example.com/foundation.jpg',
    shade: 'Natural Beige',
    comment: 'Long-lasting, natural finish',
    storeLinks: [
        {
            _id: 'store-1',
            name: 'Store 1',
            link: 'https://store1.com/foundation',
        },
    ],
}

export const mockProducts: Product[] = [
    mockProduct,
    {
        _id: '2',
        brandId: 'brand-2',
        name: 'Lipstick',
        imageUrl: 'https://example.com/lipstick.jpg',
        comment: '',
        storeLinks: [],
    },
]

export const productsHandlers = [
    http.post('api/products/one', () => {
        return HttpResponse.json({
            count: 1,
            id: 3,
            message: 'Product created successfully',
        })
    }),

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
