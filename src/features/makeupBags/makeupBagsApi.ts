import type { MutationResult, QueryResult } from '../../types/api'
import { cleanObject } from '../../utils/common'
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

        getAllMakeupBags: builder.query<MakeupBag[], void>({
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

        getMakeupBagById: builder.query<MakeupBag, string>({
            query: (id) => `/makeup-bags/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'MakeupBag', id }],
        }),

        updateMakeupBagById: builder.mutation<
            MakeupBag,
            { id: string; makeupBag: MakeupBag }
        >({
            query: ({ id, makeupBag }) => ({
                url: `/makeup-bags/${id}`,
                method: 'PUT',
                body: cleanObject(makeupBag),
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'MakeupBag', id: id },
                { type: 'MakeupBag', id: 'LIST' },
            ],
        }),

        deleteMakeupBagById: builder.mutation<QueryResult, string>({
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
    useGetAllMakeupBagsQuery,
    useGetMakeupBagByIdQuery,
    useUpdateMakeupBagByIdMutation,
    useDeleteMakeupBagByIdMutation,
} = makeupBagsApi
