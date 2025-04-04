import { act, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import {
    mockMakeupBag,
    mockMakeupBags,
} from '../../../tests/mocks/handlers/makeupBagsHandlers'
import { server } from '../../../tests/mocks/server'
import { renderHookWithProvider } from '../../../tests/mocks/wrappers'

import {
    useAddMakeupBagMutation,
    useDeleteMakeupBagMutation,
    useEditMakeupBagMutation,
    useGetMakeupBagByIdQuery,
    useGetMakeupBagsQuery,
} from '../makeupBagsApiSlice'

describe('makeupBagsApiSlice', () => {
    it('creates a new makeup bag', async () => {
        const { result } = renderHookWithProvider(() =>
            useAddMakeupBagMutation()
        )

        const [addMakeupBag] = result.current

        await act(async () => {
            const response = await addMakeupBag(mockMakeupBag).unwrap()

            expect(response).toMatchObject({
                count: 1,
                id: 3,
                message: 'MakeupBag created successfully',
            })
        })
    })

    it('reads all makeupBags', async () => {
        const { result } = renderHookWithProvider(() => useGetMakeupBagsQuery())

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toHaveLength(2)
        expect(result.current.data).toEqual(mockMakeupBags)
        expect(result.current.data?.[0]._id).toBe(mockMakeupBag._id)
    })

    it('reads a makeupBag by id', async () => {
        const { result } = renderHookWithProvider(() =>
            useGetMakeupBagByIdQuery('1')
        )

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual(mockMakeupBag)
        expect(result.current.data?._id).toBe(mockMakeupBag._id)
    })

    it('updates a makeupBag', async () => {
        const { result } = renderHookWithProvider(() =>
            useEditMakeupBagMutation()
        )

        const [editMakeupBag] = result.current

        await act(async () => {
            const response = await editMakeupBag({
                id: '1',
                ...mockMakeupBag,
            }).unwrap()

            expect(response).toMatchObject({
                id: mockMakeupBag._id!,
                message: 'MakeupBag updated successfully',
            })
        })
    })

    it('deletes a makeupBag', async () => {
        const { result } = renderHookWithProvider(() =>
            useDeleteMakeupBagMutation()
        )

        const [deleteMakeupBag] = result.current

        await act(async () => {
            const response = await deleteMakeupBag('1').unwrap()

            expect(response).toEqual({
                message: 'MakeupBag deleted successfully',
            })
        })
    })

    it('returns error on failed makeup bag creation', async () => {
        server.use(
            http.post('api/makeup-bags/one', () =>
                HttpResponse.json({ message: 'Invalid Data' }, { status: 400 })
            )
        )

        const { result } = renderHookWithProvider(() =>
            useAddMakeupBagMutation()
        )

        const [addMakeupBag] = result.current

        await act(async () => {
            const response = addMakeupBag(mockMakeupBag).unwrap()
            await expect(response).rejects.toThrow()
        })
    })

    it('returns error when makeup bag is not found', async () => {
        const { result } = renderHookWithProvider(() =>
            useGetMakeupBagByIdQuery('999')
        )

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isError).toBe(true))

        expect(result.current.error).toBeDefined()
        expect(result.current.error).toHaveProperty('status', 404)
    })

    it('returns error on failed makeup bag deletion', async () => {
        server.use(
            http.delete('api/makeup-bags/999', () =>
                HttpResponse.json(
                    { message: 'MakeupBag not found' },
                    { status: 404 }
                )
            )
        )

        const { result } = renderHookWithProvider(() =>
            useDeleteMakeupBagMutation()
        )

        const [deleteMakeupBag] = result.current

        await act(async () => {
            const response = deleteMakeupBag('999').unwrap()
            await expect(response).rejects.toThrow()
        })
    })
})
