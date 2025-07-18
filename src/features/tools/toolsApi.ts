import { api } from '@/shared/api/api'
import type { MutationResult, QueryResult } from '@/shared/types/api'
import { cleanObject } from '@/shared/utils/common'
import type { Tool } from './types'

const toolsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createTool: builder.mutation<MutationResult, Tool>({
            query: (data) => ({
                url: '/tools',
                method: 'POST',
                body: cleanObject(data),
            }),
            invalidatesTags: ['Tool'],
        }),

        getAllTools: builder.query<Tool[], void>({
            query: () => '/tools',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ _id }) => ({
                              type: 'Tool' as const,
                              id: _id,
                          })),
                          { type: 'Tool', id: 'LIST' },
                      ]
                    : [{ type: 'Tool', id: 'LIST' }],
        }),

        getToolById: builder.query<Tool, string>({
            query: (id) => `/tools/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Tool', id }],
        }),

        updateToolById: builder.mutation<Tool, { id: string; tool: Tool }>({
            query: ({ id, tool }) => ({
                url: `/tools/${id}`,
                method: 'PUT',
                body: cleanObject(tool),
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Tool', id: id },
                { type: 'Tool', id: 'LIST' },
            ],
        }),

        updateToolStoreLinks: builder.mutation<
            MutationResult,
            { id: string; data: Pick<Tool, 'storeLinks'> }
        >({
            query: ({ id, data }) => ({
                url: `/tools/${id}/store-links`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Tool', id: id },
                { type: 'Tool', id: 'LIST' },
            ],
        }),

        deleteToolById: builder.mutation<QueryResult, string>({
            query: (id) => ({
                url: `/tools/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => [{ type: 'Tool', id: 'LIST' }],
        }),
    }),
})

export const {
    useCreateToolMutation,
    useGetAllToolsQuery,
    useGetToolByIdQuery,
    useUpdateToolByIdMutation,
    useUpdateToolStoreLinksMutation,
    useDeleteToolByIdMutation,
} = toolsApi
