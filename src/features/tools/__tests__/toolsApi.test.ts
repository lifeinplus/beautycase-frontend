import { describe, expect, it } from 'vitest'
import { act, waitFor } from '@testing-library/react'

import { renderHookWithProvider } from '@/tests/mocks/wrappers'
import { mockTool1, mockToolCreate, mockTools } from '../__mocks__/toolsApi'
import {
    useCreateToolMutation,
    useDeleteToolByIdMutation,
    useUpdateToolByIdMutation,
    useGetToolByIdQuery,
    useGetAllToolsQuery,
} from '../toolsApi'

describe('toolsApi', () => {
    describe('createTool', () => {
        it('adds a new tool successfully', async () => {
            const { result } = renderHookWithProvider(() =>
                useCreateToolMutation()
            )

            const [createTool] = result.current

            await act(async () => {
                const response = await createTool(mockTool1).unwrap()
                expect(response).toMatchObject(mockToolCreate)
            })
        })
    })

    describe('getAllTools', () => {
        it('fetches all tools successfully', async () => {
            const { result } = renderHookWithProvider(() =>
                useGetAllToolsQuery()
            )

            expect(result.current.isLoading).toBe(true)

            await waitFor(() => expect(result.current.isSuccess).toBe(true))

            expect(result.current.data).toEqual(mockTools)
        })
    })

    describe('getToolById', () => {
        it('fetches a single tool successfully', async () => {
            const { result } = renderHookWithProvider(() =>
                useGetToolByIdQuery(mockTool1._id!)
            )

            expect(result.current.isLoading).toBe(true)

            await waitFor(() => expect(result.current.isSuccess).toBe(true))

            expect(result.current.data).toEqual(mockTool1)
        })

        it('handles 404 error when tool is not found', async () => {
            const { result } = renderHookWithProvider(() =>
                useGetToolByIdQuery('999')
            )

            expect(result.current.isLoading).toBe(true)

            await waitFor(() => expect(result.current.isError).toBe(true))

            expect(result.current.error).toBeDefined()
        })
    })

    describe('updateToolById', () => {
        it('edits a tool successfully', async () => {
            const { result } = renderHookWithProvider(() =>
                useUpdateToolByIdMutation()
            )

            const [updateToolById] = result.current

            await act(async () => {
                const response = await updateToolById({
                    id: mockTool1._id!,
                    tool: mockTool1,
                }).unwrap()

                expect(response).toMatchObject({
                    id: mockTool1._id!,
                    message: 'Tool successfully changed',
                })
            })
        })
    })

    describe('deleteToolById', () => {
        it('deletes a tool successfully', async () => {
            const { result } = renderHookWithProvider(() =>
                useDeleteToolByIdMutation()
            )

            const [deleteTool] = result.current

            await act(async () => {
                const response = await deleteTool(mockTool1._id!).unwrap()

                expect(response).toEqual({
                    message: 'Tool successfully deleted',
                })
            })
        })
    })
})
