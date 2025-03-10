import { http, HttpResponse } from 'msw'
import { type MakeupBag } from '../../features/makeupBags'

export const mockMakeupBag: MakeupBag = {
    _id: '1',
    categoryId: 'category1',
    clientId: 'client1',
    stageIds: [],
    toolIds: [],
}

export const mockMakeupBags: MakeupBag[] = [
    mockMakeupBag,
    {
        _id: '2',
        categoryId: 'category2',
        clientId: 'client2',
        stageIds: [],
        toolIds: [],
    },
]

export const makeupBagsHandlers = [
    http.post('api/makeup-bags/one', () => {
        return HttpResponse.json({
            count: 1,
            id: 3,
            message: 'MakeupBag created successfully',
        })
    }),

    http.get('api/makeup-bags/all', () => HttpResponse.json(mockMakeupBags)),

    http.get('api/makeup-bags/:id', ({ params }) => {
        const makeupBag = mockMakeupBags.find((p) => p._id === params.id)
        return makeupBag
            ? HttpResponse.json(makeupBag)
            : HttpResponse.json(
                  { success: false, message: 'MakeupBag not found' },
                  { status: 404 }
              )
    }),

    http.put('api/makeup-bags/:id', async ({ params }) =>
        HttpResponse.json({
            id: params.id,
            message: 'MakeupBag updated successfully',
        })
    ),

    http.delete('api/makeup-bags/:id', () =>
        HttpResponse.json({ message: 'MakeupBag deleted successfully' })
    ),
]
