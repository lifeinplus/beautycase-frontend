import { http, HttpResponse } from 'msw'
import { MakeupBag } from '../../../features/makeupBags/types'

export const mockMakeupBag: MakeupBag = {
    _id: 'makeupBag1',
    createdAt: '2025-04-10T10:00:00Z',
    category: { _id: 'category1', name: 'Test Category 1' },
    categoryId: 'category1',
    client: { _id: 'client1', username: 'Test Client 1' },
    clientId: 'client1',
    stageIds: ['stage1', 'stage2'],
    toolIds: ['tool1', 'tool2', 'tool3'],
}

export const mockMakeupBags: MakeupBag[] = [
    mockMakeupBag,
    {
        _id: 'makeupBag2',
        createdAt: '2025-04-20T12:30:00Z',
        categoryId: 'category2',
        clientId: 'client2',
        stageIds: ['stage3', 'stage4'],
        toolIds: ['tool4', 'tool5', 'tool6'],
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
