import { describe, expect, it } from 'vitest'
import { act, waitFor } from '@testing-library/react'

import { renderHookWithProvider } from '../../../tests/mocks/wrappers'
import { mockTool, mockToolCreate, mockTools } from '../__mocks__/toolsApi'
import {
    useCreateToolMutation,
    useDeleteToolByIdMutation,
    useUpdateToolByIdMutation,
    useGetToolByIdQuery,
    useGetAllToolsQuery,
} from '../toolsApi'

describe('toolsApi', () => {
    it('fetches all tools successfully', async () => {
        const { result } = renderHookWithProvider(() => useGetAllToolsQuery())

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual(mockTools)
    })

    it('fetches a single tool successfully', async () => {
        const { result } = renderHookWithProvider(() =>
            useGetToolByIdQuery(mockTool._id!)
        )

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual(mockTool)
    })

    it('adds a new tool successfully', async () => {
        const { result } = renderHookWithProvider(() => useCreateToolMutation())

        const [addTool] = result.current

        await act(async () => {
            const response = await addTool(mockTool).unwrap()
            expect(response).toMatchObject(mockToolCreate)
        })
    })

    it('edits a tool successfully', async () => {
        const { result } = renderHookWithProvider(() =>
            useUpdateToolByIdMutation()
        )

        const [updateToolById] = result.current

        await act(async () => {
            const response = await updateToolById({
                id: mockTool._id!,
                tool: mockTool,
            }).unwrap()

            expect(response).toMatchObject({
                id: mockTool._id!,
                message: 'Tool successfully changed',
            })
        })
    })

    it('deletes a tool successfully', async () => {
        const { result } = renderHookWithProvider(() =>
            useDeleteToolByIdMutation()
        )

        const [deleteTool] = result.current

        await act(async () => {
            const response = await deleteTool(mockTool._id!).unwrap()

            expect(response).toEqual({ message: 'Tool successfully deleted' })
        })
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
