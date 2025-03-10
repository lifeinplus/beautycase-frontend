import { http, HttpResponse } from 'msw'
import { type Lesson } from '../../features/lessons'

export const mockLesson: Lesson = {
    _id: '1',
    title: 'Lesson 1',
    shortDescription: 'Short Desc 1',
    fullDescription: 'Full Desc 1',
    videoUrl: 'https://video.com/1',
    productIds: [],
}

export const mockLessons: Lesson[] = [
    mockLesson,
    {
        _id: '2',
        title: 'Lesson 2',
        shortDescription: 'Short Desc 2',
        fullDescription: 'Full Desc 2',
        videoUrl: 'https://video.com/2',
        productIds: [],
    },
]

export const lessonsHandlers = [
    http.post('api/lessons/one', () => {
        return HttpResponse.json({
            count: 1,
            id: 3,
            message: 'Lesson created successfully',
        })
    }),

    http.get('api/lessons/all', () => HttpResponse.json(mockLessons)),

    http.get('api/lessons/:id', ({ params }) => {
        const lesson = mockLessons.find((p) => p._id === params.id)
        return lesson
            ? HttpResponse.json(lesson)
            : HttpResponse.json(
                  { success: false, message: 'Lesson not found' },
                  { status: 404 }
              )
    }),

    http.put('api/lessons/:id', async ({ params }) =>
        HttpResponse.json({
            id: params.id,
            message: 'Lesson updated successfully',
        })
    ),

    http.delete('api/lessons/:id', () =>
        HttpResponse.json({ message: 'Lesson deleted successfully' })
    ),
]
