import { http, HttpResponse } from 'msw'
import { type Brand } from '../../features/brands'

export const mockBrand: Brand = {
    _id: '1',
    name: 'Brand 1',
}

export const mockBrands: Brand[] = [
    mockBrand,
    {
        _id: '2',
        name: 'Brand 2',
    },
]

export const brandsHandlers = [
    http.post('api/brands', () => {
        return HttpResponse.json({
            count: 1,
            id: 3,
            message: 'Brand created successfully',
        })
    }),

    http.get('api/brands', () => HttpResponse.json(mockBrands)),

    http.get('api/brands/:id', ({ params }) => {
        const brand = mockBrands.find((p) => p._id === params.id)
        return brand
            ? HttpResponse.json(brand)
            : HttpResponse.json(
                  { success: false, message: 'Brand not found' },
                  { status: 404 }
              )
    }),

    http.put('api/brands/:id', async ({ params }) =>
        HttpResponse.json({
            id: params.id,
            message: 'Brand updated successfully',
        })
    ),

    http.delete('api/brands/:id', () =>
        HttpResponse.json({ message: 'Brand deleted successfully' })
    ),
]
