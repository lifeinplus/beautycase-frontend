import { api } from '@/shared/api/api'
import type { MutationResult, QueryResult } from '@/shared/types/api'
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

        getAllLessons: builder.query<Lesson[], void>({
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

        getLessonById: builder.query<Lesson, string>({
            query: (id) => `/lessons/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Lesson', id }],
        }),

        updateLessonById: builder.mutation<
            Lesson,
            { id: string; lesson: Lesson }
        >({
            query: ({ id, lesson }) => ({
                url: `/lessons/${id}`,
                method: 'PUT',
                body: lesson,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Lesson', id: id },
                { type: 'Lesson', id: 'LIST' },
            ],
        }),

        updateLessonProducts: builder.mutation<
            MutationResult,
            { id: string; data: Pick<Lesson, 'productIds'> }
        >({
            query: ({ id, data }) => ({
                url: `/lessons/${id}/products`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Lesson', id: id },
                { type: 'Lesson', id: 'LIST' },
            ],
        }),

        deleteLessonById: builder.mutation<QueryResult, string>({
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
    useGetAllLessonsQuery,
    useGetLessonByIdQuery,
    useUpdateLessonByIdMutation,
    useUpdateLessonProductsMutation,
    useDeleteLessonByIdMutation,
} = lessonsApi
