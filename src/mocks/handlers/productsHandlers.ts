import { http, HttpResponse } from 'msw'
import { type Product } from '../../features/products'

export const mockProduct: Product = {
    _id: '1',
    brandId: '11',
    name: 'Foundation',
    imageUrl: '',
    comment: '',
    storeLinks: [],
}

export const mockProducts: Product[] = [
    mockProduct,
    {
        _id: '2',
        brandId: '22',
        name: 'Lipstick',
        imageUrl: '',
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
