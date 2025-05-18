import { act, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderHookWithProvider } from '../../../tests/mocks/wrappers'
import {
    mockStage,
    mockStageCreate,
    mockStageDuplicate,
    mockStages,
} from '../__mocks__/stagesApi'
import {
    useCreateStageMutation,
    useDeleteStageMutation,
    useDuplicateStageMutation,
    useReadStagesQuery,
    useReadStageQuery,
    useUpdateStageMutation,
} from '../stagesApi'

describe('stagesApi', () => {
    it('creates a new stage', async () => {
        const { result } = renderHookWithProvider(() =>
            useCreateStageMutation()
        )

        const [createStage] = result.current

        await act(async () => {
            const response = await createStage(mockStage).unwrap()
            expect(response).toMatchObject(mockStageCreate)
        })
    })

    it('duplicates a stage', async () => {
        const { result } = renderHookWithProvider(() =>
            useDuplicateStageMutation()
        )

        const [duplicateStage] = result.current

        await act(async () => {
            const response = await duplicateStage('stage1').unwrap()
            expect(response).toMatchObject(mockStageDuplicate)
        })
    })

    it('reads all stages', async () => {
        const { result } = renderHookWithProvider(() => useReadStagesQuery())

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toHaveLength(2)
        expect(result.current.data).toEqual(mockStages)
        expect(result.current.data?.[0].title).toBe('Base Makeup')
    })

    it('reads a stage by id', async () => {
        const { result } = renderHookWithProvider(() =>
            useReadStageQuery('stage1')
        )

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual(mockStage)
        expect(result.current.data?.title).toBe('Base Makeup')
    })

    it('updates a stage', async () => {
        const { result } = renderHookWithProvider(() =>
            useUpdateStageMutation()
        )

        const [updateStage] = result.current

        await act(async () => {
            const response = await updateStage(mockStage).unwrap()

            expect(response).toMatchObject({
                id: mockStage._id!,
                message: 'Stage updated successfully',
            })
        })
    })

    it('deletes a stage', async () => {
        const { result } = renderHookWithProvider(() =>
            useDeleteStageMutation()
        )

        const [deleteStage] = result.current

        await act(async () => {
            const response = await deleteStage('1').unwrap()

            expect(response).toEqual({ message: 'Stage deleted successfully' })
        })
    })

    it('handles 404 error when stage is not found', async () => {
        const { result } = renderHookWithProvider(() =>
            useReadStageQuery('999')
        )

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isError).toBe(true))

        expect(result.current.error).toBeDefined()
        expect(result.current.error).toHaveProperty('status', 404)
    })
})
