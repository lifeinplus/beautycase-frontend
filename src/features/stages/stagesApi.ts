import { api } from '@/shared/api/api'
import type { MutationResult, QueryResult } from '@/shared/types/api'
import { cleanObject } from '@/shared/utils/common'
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

        duplicateStageById: builder.mutation<MutationResult, string>({
            query: (id) => ({
                url: `/stages/duplicate/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['Stage'],
        }),

        getAllStages: builder.query<Stage[], void>({
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

        getStageById: builder.query<Stage, string>({
            query: (id) => `/stages/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Stage', id }],
        }),

        updateStageById: builder.mutation<Stage, { id: string; stage: Stage }>({
            query: ({ id, stage }) => ({
                url: `/stages/${id}`,
                method: 'PUT',
                body: cleanObject(stage),
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Stage', id: id },
                { type: 'Stage', id: 'LIST' },
            ],
        }),

        updateStageProducts: builder.mutation<
            MutationResult,
            { id: string; data: Pick<Stage, 'productIds'> }
        >({
            query: ({ id, data }) => ({
                url: `/stages/${id}/products`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Stage', id: id },
                { type: 'Stage', id: 'LIST' },
            ],
        }),

        deleteStageById: builder.mutation<QueryResult, string>({
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
    useDuplicateStageByIdMutation,
    useGetAllStagesQuery,
    useGetStageByIdQuery,
    useUpdateStageByIdMutation,
    useUpdateStageProductsMutation,
    useDeleteStageByIdMutation,
} = stagesApi
