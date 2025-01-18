import type { MutationResult, QueryResult } from '../../types'
import { apiSlice } from '../api/apiSlice'
import type { Tool } from './types'

export const toolsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addTool: builder.mutation<MutationResult, Partial<Tool>>({
            query: (data) => ({
                url: '/tools/one',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Tool'],
        }),

        deleteTool: builder.mutation<QueryResult, string>({
            query: (id) => ({
                url: `/tools/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => [{ type: 'Tool', id: 'LIST' }],
        }),

        editTool: builder.mutation<Tool, { id: string } & Partial<Tool>>({
            query: ({
                id,
                name,
                brandId,
                image,
                storeLinks,
                number,
                comment,
            }) => ({
                url: `/tools/${id}`,
                method: 'PUT',
                body: { name, brandId, image, storeLinks, number, comment },
            }),
            invalidatesTags: (_result, _error, tool) => [
                { type: 'Tool', id: tool._id },
                { type: 'Tool', id: 'LIST' },
            ],
        }),

        getToolById: builder.query<Tool, string>({
            query: (id) => `/tools/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Tool', id }],
        }),

        getTools: builder.query<Tool[], void>({
            query: () => '/tools/all',
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
    }),
})

export const {
    useAddToolMutation,
    useDeleteToolMutation,
    useEditToolMutation,
    useGetToolByIdQuery,
    useGetToolsQuery,
} = toolsApiSlice
