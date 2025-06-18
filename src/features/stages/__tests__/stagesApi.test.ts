import { act, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderHookWithProvider } from '../../../tests/mocks/wrappers'
import {
    mockStage1,
    mockStageCreate,
    mockStageDuplicate,
    mockStages,
} from '../__mocks__/stagesApi'
import {
    useCreateStageMutation,
    useDeleteStageByIdMutation,
    useDuplicateStageByIdMutation,
    useGetAllStagesQuery,
    useGetStageByIdQuery,
    useUpdateStageByIdMutation,
} from '../stagesApi'

describe('stagesApi', () => {
    describe('createStage', () => {
        it('creates a new stage', async () => {
            const { result } = renderHookWithProvider(() =>
                useCreateStageMutation()
            )

            const [createStage] = result.current

            await act(async () => {
                const response = await createStage(mockStage1).unwrap()
                expect(response).toMatchObject(mockStageCreate)
            })
        })
    })

    describe('duplicateStageById', () => {
        it('duplicates a stage', async () => {
            const { result } = renderHookWithProvider(() =>
                useDuplicateStageByIdMutation()
            )

            const [duplicateStage] = result.current

            await act(async () => {
                const response = await duplicateStage('stage1').unwrap()
                expect(response).toMatchObject(mockStageDuplicate)
            })
        })
    })

    describe('getAllStages', () => {
        it('gets all stages', async () => {
            const { result } = renderHookWithProvider(() =>
                useGetAllStagesQuery()
            )

            expect(result.current.isLoading).toBe(true)

            await waitFor(() => expect(result.current.isSuccess).toBe(true))

            expect(result.current.data).toHaveLength(2)
            expect(result.current.data).toEqual(mockStages)
            expect(result.current.data?.[0].title).toBe('Base Makeup')
        })
    })

    describe('getStageById', () => {
        it('gets a stage by id', async () => {
            const { result } = renderHookWithProvider(() =>
                useGetStageByIdQuery('stage1')
            )

            expect(result.current.isLoading).toBe(true)

            await waitFor(() => expect(result.current.isSuccess).toBe(true))

            expect(result.current.data).toEqual(mockStage1)
            expect(result.current.data?.title).toBe('Base Makeup')
        })

        it('handles 404 error when stage is not found', async () => {
            const { result } = renderHookWithProvider(() =>
                useGetStageByIdQuery('999')
            )

            expect(result.current.isLoading).toBe(true)

            await waitFor(() => expect(result.current.isError).toBe(true))

            expect(result.current.error).toBeDefined()
            expect(result.current.error).toHaveProperty('status', 404)
        })
    })

    describe('updateStageById', () => {
        it('updates a stage', async () => {
            const { result } = renderHookWithProvider(() =>
                useUpdateStageByIdMutation()
            )

            const [updateStageById] = result.current

            await act(async () => {
                const response = await updateStageById({
                    id: mockStage1._id!,
                    stage: mockStage1,
                }).unwrap()

                expect(response).toMatchObject({
                    id: mockStage1._id!,
                    message: 'Stage updated successfully',
                })
            })
        })
    })

    describe('deleteStageById', () => {
        it('deletes a stage', async () => {
            const { result } = renderHookWithProvider(() =>
                useDeleteStageByIdMutation()
            )

            const [deleteStage] = result.current

            await act(async () => {
                const response = await deleteStage('1').unwrap()

                expect(response).toEqual({
                    message: 'Stage deleted successfully',
                })
            })
        })
    })
})
