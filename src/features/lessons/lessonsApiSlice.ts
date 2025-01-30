import type { MutationResult, QueryResult } from '../../types'
import { apiSlice } from '../api/apiSlice'
import type { Lesson } from './types'

export const lessonsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addLesson: builder.mutation<MutationResult, Partial<Lesson>>({
            query: ({
                title,
                shortDescription,
                videoUrl,
                fullDescription,
                productIds,
            }) => ({
                url: '/lessons/one',
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
        deleteLesson: builder.mutation<QueryResult, string>({
            query: (id) => ({
                url: `/lessons/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => [{ type: 'Lesson', id: 'LIST' }],
        }),
        editLesson: builder.mutation<Lesson, { id: string } & Partial<Lesson>>({
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
        getLessonById: builder.query<Lesson, string>({
            query: (id) => `/lessons/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Lesson', id }],
        }),
        getLessons: builder.query<Lesson[], void>({
            query: () => '/lessons/all',
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
    }),
})

export const {
    useAddLessonMutation,
    useEditLessonMutation,
    useGetLessonByIdQuery,
    useGetLessonsQuery,
    useDeleteLessonMutation,
} = lessonsApiSlice
