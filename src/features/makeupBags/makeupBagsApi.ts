import type { MutationResult, QueryResult } from '../../types/api'
import { api } from '../api/api'
import type { MakeupBag } from './types'

const makeupBagsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createMakeupBag: builder.mutation<MutationResult, Partial<MakeupBag>>({
            query: (data) => ({
                url: '/makeup-bags',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['MakeupBag'],
        }),

        readMakeupBag: builder.query<MakeupBag, string>({
            query: (id) => `/makeup-bags/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'MakeupBag', id }],
        }),

        readMakeupBags: builder.query<MakeupBag[], void>({
            query: () => '/makeup-bags',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ _id }) => ({
                              type: 'MakeupBag' as const,
                              id: _id,
                          })),
                          { type: 'MakeupBag', id: 'LIST' },
                      ]
                    : [{ type: 'MakeupBag', id: 'LIST' }],
        }),

        updateMakeupBag: builder.mutation<
            MakeupBag,
            { id: string } & Partial<MakeupBag>
        >({
            query: ({ id, categoryId, clientId, stageIds, toolIds }) => ({
                url: `/makeup-bags/${id}`,
                method: 'PUT',
                body: {
                    clientId,
                    categoryId,
                    stageIds,
                    toolIds,
                },
            }),
            invalidatesTags: (_result, _error, makeupBag) => [
                { type: 'MakeupBag', id: makeupBag._id },
                { type: 'MakeupBag', id: 'LIST' },
            ],
        }),

        deleteMakeupBag: builder.mutation<QueryResult, string>({
            query: (id) => ({
                url: `/makeup-bags/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => [{ type: 'MakeupBag', id: 'LIST' }],
        }),
    }),
})

export const {
    useCreateMakeupBagMutation,
    useReadMakeupBagQuery,
    useReadMakeupBagsQuery,
    useUpdateMakeupBagMutation,
    useDeleteMakeupBagMutation,
} = makeupBagsApi
