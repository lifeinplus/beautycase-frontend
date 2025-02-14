import type { MutationResult, QueryResult } from '../../types'
import { cleanObject } from '../../utils'
import { apiSlice } from '../api/apiSlice'
import { type Stage } from '../stages'

const stagesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addStage: builder.mutation<MutationResult, Partial<Stage>>({
            query: (data) => ({
                url: '/stages/one',
                method: 'POST',
                body: cleanObject(data),
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
        editStage: builder.mutation<
            Stage,
            { id: string; body: Partial<Stage> }
        >({
            query: (data) => ({
                url: `/stages/${data.id}`,
                method: 'PUT',
                body: cleanObject(data.body),
            }),
            invalidatesTags: (_result, _error, stage) => [
                { type: 'Stage', id: stage.id },
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
