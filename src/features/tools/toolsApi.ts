import type { MutationResult, QueryResult } from '../../types/api'
import { cleanObject } from '../../utils/common'
import { api } from '../api/api'
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

        readTool: builder.query<Tool, string>({
            query: (id) => `/tools/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Tool', id }],
        }),

        readTools: builder.query<Tool[], void>({
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

        updateTool: builder.mutation<Tool, { id: string; body: Tool }>({
            query: (data) => ({
                url: `/tools/${data.id}`,
                method: 'PUT',
                body: cleanObject(data.body),
            }),
            invalidatesTags: (_result, _error, tool) => [
                { type: 'Tool', id: tool.id },
                { type: 'Tool', id: 'LIST' },
            ],
        }),

        deleteTool: builder.mutation<QueryResult, string>({
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
    useReadToolQuery,
    useReadToolsQuery,
    useUpdateToolMutation,
    useDeleteToolMutation,
} = toolsApi
