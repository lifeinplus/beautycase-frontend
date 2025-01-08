import type { MutationResult, QueryResult } from '../../types'
import { apiSlice } from '../api'
import type { MakeupBag } from './types'

const makeupBagsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addMakeupBag: builder.mutation<MutationResult, Partial<MakeupBag>>({
            query: (data) => ({
                url: '/makeup-bags/one',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['MakeupBag'],
        }),
        deleteMakeupBag: builder.mutation<QueryResult, string>({
            query: (id) => ({
                url: `/makeup-bags/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => [{ type: 'MakeupBag', id: 'LIST' }],
        }),
        editMakeupBag: builder.mutation<
            MakeupBag,
            { id: string } & Partial<MakeupBag>
        >({
            query: ({ id, clientId, selectedStageIds }) => ({
                url: `/makeup-bags/${id}`,
                method: 'PUT',
                body: { clientId, selectedStageIds },
            }),
            invalidatesTags: (_result, _error, makeupBag) => [
                { type: 'MakeupBag', id: makeupBag._id },
                { type: 'MakeupBag', id: 'LIST' },
            ],
        }),
        getMakeupBagById: builder.query<MakeupBag, string>({
            query: (id) => `/makeup-bags/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'MakeupBag', id }],
        }),
        getMakeupBags: builder.query<MakeupBag[], void>({
            query: () => '/makeup-bags/all',
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
    }),
})

export const {
    useAddMakeupBagMutation,
    useDeleteMakeupBagMutation,
    useEditMakeupBagMutation,
    useGetMakeupBagByIdQuery,
    useGetMakeupBagsQuery,
} = makeupBagsApiSlice
