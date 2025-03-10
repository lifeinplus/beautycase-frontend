import { act, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { mockStore, mockStores, renderWithProvider } from '../../../mocks'
import {
    useCreateStoreMutation,
    useDeleteStoreMutation,
    useUpdateStoreMutation,
    useReadStoresQuery,
} from '../storesApiSlice'

describe('storesApiSlice', () => {
    it('creates a new store successfully', async () => {
        const { result } = renderWithProvider(() => useCreateStoreMutation())

        const [createStore] = result.current

        await act(async () => {
            const response = await createStore(mockStore).unwrap()

            expect(response).toMatchObject({
                count: 1,
                id: 3,
                message: 'Store created successfully',
            })
        })
    })

    it('reads all stores successfully', async () => {
        const { result } = renderWithProvider(() => useReadStoresQuery())

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual(mockStores)
    })

    it('updates a store successfully', async () => {
        const { result } = renderWithProvider(() => useUpdateStoreMutation())

        const [updateStore] = result.current

        await act(async () => {
            const response = await updateStore(mockStore).unwrap()

            expect(response).toMatchObject({
                id: mockStore._id!,
                message: 'Store updated successfully',
            })
        })
    })

    it('deletes a store successfully', async () => {
        const { result } = renderWithProvider(() => useDeleteStoreMutation())

        const [deleteStore] = result.current

        await act(async () => {
            const response = await deleteStore(mockStore._id!).unwrap()

            expect(response).toEqual({ message: 'Store deleted successfully' })
        })
    })
})
