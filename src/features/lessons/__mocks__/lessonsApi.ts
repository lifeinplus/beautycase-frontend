import { http, HttpResponse } from 'msw'
import { vi } from 'vitest'

import type { MutationResult } from '../../../shared/types/api'
import type { Lesson } from '../types'

export const mockLessonCreate: MutationResult = {
    id: 'lesson3',
    message: 'Lesson created successfully',
}

export const mockLesson1: Lesson = {
    _id: 'lesson1',
    title: 'Makeup Basics',
    shortDescription: 'Introduction to Makeup fundamentals',
    fullDescription: 'A comprehensive introduction to Makeup',
    videoUrl: 'https://video.com/makeup-basics',
    productIds: ['1', '2', '3'],
    products: [
        {
            _id: 'product-1',
            brandId: 'brand-1',
            name: 'Product 1',
            imageUrl: 'https://example.com/product-1.jpg',
            comment: 'Comment 1',
            storeLinks: [],
        },
    ],
}

export const mockLesson2: Lesson = {
    _id: 'lesson2',
    title: 'Lesson 2',
    shortDescription: 'Short Desc 2',
    fullDescription: 'Full Desc 2',
    videoUrl: 'https://video.com/2',
    productIds: [],
}

export const mockLessons: Lesson[] = [mockLesson1, mockLesson2]

export const useCreateLessonMutation = vi.fn()
export const useGetAllLessonsQuery = vi.fn()
export const useGetLessonByIdQuery = vi.fn()
export const useUpdateLessonByIdMutation = vi.fn()
export const useDeleteLessonByIdMutation = vi.fn()

const lessonsHandlers = [
    http.post('api/lessons', () => {
        return HttpResponse.json(mockLessonCreate)
    }),

    http.get('api/lessons', () => HttpResponse.json(mockLessons)),

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

export default lessonsHandlers
