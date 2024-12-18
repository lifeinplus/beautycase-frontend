import { apiSlice } from '../api/apiSlice'
import type { QueryResult, Lesson } from './types'

export const lessonsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addLesson: builder.mutation<Lesson, Partial<Lesson>>({
            query: ({
                title,
                shortDescription,
                videoUrl,
                fullDescription,
                selectedProductIds,
            }) => ({
                url: '/lessons/one',
                method: 'POST',
                body: {
                    title,
                    shortDescription,
                    videoUrl,
                    fullDescription,
                    selectedProductIds,
                },
            }),
            invalidatesTags: ['Lesson'],
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
        editLesson: builder.mutation<Lesson, { id: string } & Partial<Lesson>>({
            query: ({
                id,
                fullDescription,
                shortDescription,
                title,
                videoUrl,
                selectedProductIds,
            }) => ({
                url: `/lessons/${id}`,
                method: 'PUT',
                body: {
                    fullDescription,
                    shortDescription,
                    title,
                    videoUrl,
                    selectedProductIds,
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
    useAddLessonMutation,
    useEditLessonMutation,
    useGetLessonByIdQuery,
    useGetLessonsQuery,
    useDeleteLessonMutation,
} = lessonsApiSlice
