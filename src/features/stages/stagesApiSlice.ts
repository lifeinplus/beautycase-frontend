import type { MutationResult, QueryResult } from '../../types'
import { apiSlice } from '../api'
import type { Stage } from './types'

const stagesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addStage: builder.mutation<MutationResult, Partial<Stage>>({
            query: ({ title, subtitle, imageUrl, steps, productIds }) => ({
                url: '/stages/one',
                method: 'POST',
                body: {
                    title,
                    subtitle,
                    imageUrl,
                    steps,
                    productIds,
                },
            }),
            invalidatesTags: ['Stage'],
        }),
        deleteStage: builder.mutation<QueryResult, string>({
            query: (id) => ({
                url: `/stages/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => [{ type: 'Stage', id: 'LIST' }],
        }),
        editStage: builder.mutation<Stage, Stage>({
            query: ({ _id, title, subtitle, imageUrl, steps, productIds }) => ({
                url: `/stages/${_id}`,
                method: 'PUT',
                body: {
                    title,
                    subtitle,
                    imageUrl,
                    steps,
                    productIds,
                },
            }),
            invalidatesTags: (_result, _error, stage) => [
                { type: 'Stage', id: stage._id },
                { type: 'Stage', id: 'LIST' },
            ],
        }),
        getStageById: builder.query<Stage, string>({
            query: (id) => `/stages/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Stage', id }],
        }),
        getStages: builder.query<Stage[], void>({
            query: () => '/stages/all',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ _id }) => ({
                              type: 'Stage' as const,
                              id: _id,
                          })),
                          { type: 'Stage', id: 'LIST' },
                      ]
                    : [{ type: 'Stage', id: 'LIST' }],
        }),
    }),
})

export const {
    useAddStageMutation,
    useDeleteStageMutation,
    useEditStageMutation,
    useGetStageByIdQuery,
    useGetStagesQuery,
} = stagesApiSlice
