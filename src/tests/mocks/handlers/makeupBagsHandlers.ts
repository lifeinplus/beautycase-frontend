import { http, HttpResponse } from 'msw'
import { MakeupBag } from '../../../features/makeupBags/types'

export const mockMakeupBag: MakeupBag = {
    _id: '1',
    categoryId: 'category-1',
    clientId: 'client-1',
    stageIds: ['stage-1', 'stage-2'],
    toolIds: ['tool-1', 'tool-2', 'tool-3'],
}

export const mockMakeupBags: MakeupBag[] = [
    mockMakeupBag,
    {
        _id: '2',
        categoryId: 'category-2',
        clientId: 'client-2',
        stageIds: ['stage-3', 'stage-4'],
        toolIds: ['tool-4', 'tool-5', 'tool-6'],
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
