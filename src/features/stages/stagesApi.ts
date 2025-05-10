import type { MutationResult, QueryResult } from '../../types/api'
import { cleanObject } from '../../utils/common'
import { api } from '../api/api'
import type { Stage } from './types'

const stagesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createStage: builder.mutation<MutationResult, Stage>({
            query: (data) => ({
                url: '/stages',
                method: 'POST',
                body: cleanObject(data),
            }),
            invalidatesTags: ['Stage'],
        }),

        duplicateStage: builder.mutation<MutationResult, string>({
            query: (id) => ({
                url: `/stages/duplicate/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['Stage'],
        }),

        readStageById: builder.query<Stage, string>({
            query: (id) => `/stages/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Stage', id }],
        }),

        readStages: builder.query<Stage[], void>({
            query: () => '/stages',
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

        updateStage: builder.mutation<Stage, Stage>({
            query: ({ _id, ...body }) => ({
                url: `/stages/${_id}`,
                method: 'PUT',
                body: cleanObject(body),
            }),
            invalidatesTags: (_result, _error, stage) => [
                { type: 'Stage', id: stage._id },
                { type: 'Stage', id: 'LIST' },
            ],
        }),

        deleteStage: builder.mutation<QueryResult, string>({
            query: (id) => ({
                url: `/stages/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => [{ type: 'Stage', id: 'LIST' }],
        }),
    }),
})

export const {
    useCreateStageMutation,
    useDuplicateStageMutation,
    useReadStageByIdQuery,
    useReadStagesQuery,
    useUpdateStageMutation,
    useDeleteStageMutation,
} = stagesApi
