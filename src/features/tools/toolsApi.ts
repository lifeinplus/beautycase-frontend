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
    useDeleteToolByIdMutation,
} = toolsApi
