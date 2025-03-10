import { describe, expect, it } from 'vitest'
import { act, waitFor } from '@testing-library/react'

import { mockTool, mockTools, renderWithProvider } from '../../../mocks'
import {
    useAddToolMutation,
    useDeleteToolMutation,
    useEditToolMutation,
    useGetToolByIdQuery,
    useGetToolsQuery,
} from '../toolsApiSlice'

describe('toolsApiSlice', () => {
    it('fetches all tools successfully', async () => {
        const { result } = renderWithProvider(() => useGetToolsQuery())

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual(mockTools)
    })

    it('fetches a single tool successfully', async () => {
        const { result } = renderWithProvider(() =>
            useGetToolByIdQuery(mockTool._id!)
        )

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual(mockTool)
    })

    it('adds a new tool successfully', async () => {
        const { result } = renderWithProvider(() => useAddToolMutation())

        const [addTool] = result.current

        await act(async () => {
            const response = await addTool(mockTool).unwrap()

            expect(response).toMatchObject({
                count: 1,
                id: 3,
                message: 'Tool added successfully',
            })
        })
    })

    it('edits a tool successfully', async () => {
        const { result } = renderWithProvider(() => useEditToolMutation())

        const [editTool] = result.current

        await act(async () => {
            const response = await editTool({
                id: mockTool._id!,
                body: mockTool,
            }).unwrap()

            expect(response).toMatchObject({
                id: mockTool._id!,
                message: 'Tool successfully changed',
            })
        })
    })

    it('deletes a tool successfully', async () => {
        const { result } = renderWithProvider(() => useDeleteToolMutation())

        const [deleteTool] = result.current

        await act(async () => {
            const response = await deleteTool(mockTool._id!).unwrap()

            expect(response).toEqual({ message: 'Tool successfully deleted' })
        })
    })

    it('handles 404 error when tool is not found', async () => {
        const { result } = renderWithProvider(() => useGetToolByIdQuery('999'))

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isError).toBe(true))

        expect(result.current.error).toBeDefined()
    })
})
