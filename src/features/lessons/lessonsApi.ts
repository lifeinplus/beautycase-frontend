import type { MutationResult, QueryResult } from '../../types/api'
import { api } from '../api/api'
import type { Lesson } from './types'

const lessonsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createLesson: builder.mutation<MutationResult, Partial<Lesson>>({
            query: ({
                title,
                shortDescription,
                videoUrl,
                fullDescription,
                productIds,
            }) => ({
                url: '/lessons',
                method: 'POST',
                body: {
                    title,
                    shortDescription,
                    videoUrl,
                    fullDescription,
                    productIds,
                },
            }),
            invalidatesTags: ['Lesson'],
        }),

        readLesson: builder.query<Lesson, string>({
            query: (id) => `/lessons/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Lesson', id }],
        }),

        readLessons: builder.query<Lesson[], void>({
            query: () => '/lessons',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ _id }) => ({
                              type: 'Lesson' as const,
                              id: _id,
                          })),
                          { type: 'Lesson', id: 'LIST' },
                      ]
                    : [{ type: 'Lesson', id: 'LIST' }],
        }),

        updateLesson: builder.mutation<
            Lesson,
            { id: string } & Partial<Lesson>
        >({
            query: ({
                id,
                fullDescription,
                shortDescription,
                title,
                videoUrl,
                productIds,
            }) => ({
                url: `/lessons/${id}`,
                method: 'PUT',
                body: {
                    fullDescription,
                    shortDescription,
                    title,
                    videoUrl,
                    productIds,
                },
            }),
            invalidatesTags: (_result, _error, lesson) => [
                { type: 'Lesson', id: lesson._id },
                { type: 'Lesson', id: 'LIST' },
            ],
        }),

        deleteLesson: builder.mutation<QueryResult, string>({
            query: (id) => ({
                url: `/lessons/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => [{ type: 'Lesson', id: 'LIST' }],
        }),
    }),
})

export const {
    useCreateLessonMutation,
    useReadLessonQuery,
    useReadLessonsQuery,
    useUpdateLessonMutation,
    useDeleteLessonMutation,
} = lessonsApi
