import { act, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderHookWithProvider } from '../../../tests/mocks/wrappers'
import { mockStore, mockStoreCreate, mockStores } from '../__mocks__/storesApi'
import {
    useCreateStoreMutation,
    useDeleteStoreByIdMutation,
    useUpdateStoreByIdMutation,
    useGetAllStoresQuery,
} from '../storesApi'

describe('storesApi', () => {
    it('creates a new store successfully', async () => {
        const { result } = renderHookWithProvider(() =>
            useCreateStoreMutation()
        )

        const [createStore] = result.current

        await act(async () => {
            const response = await createStore(mockStore).unwrap()
            expect(response).toMatchObject(mockStoreCreate)
        })
    })

    it('gets all stores successfully', async () => {
        const { result } = renderHookWithProvider(() => useGetAllStoresQuery())

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual(mockStores)
    })

    it('updates a store successfully', async () => {
        const { result } = renderHookWithProvider(() =>
            useUpdateStoreByIdMutation()
        )

        const [updateStoreById] = result.current

        await act(async () => {
            const response = await updateStoreById({
                id: mockStore._id!,
                store: mockStore,
            }).unwrap()

            expect(response).toMatchObject({
                id: mockStore._id!,
                message: 'Store updated successfully',
            })
        })
    })

    it('deletes a store successfully', async () => {
        const { result } = renderHookWithProvider(() =>
            useDeleteStoreByIdMutation()
        )

        const [deleteStore] = result.current

        await act(async () => {
            const response = await deleteStore(mockStore._id!).unwrap()

            expect(response).toEqual({ message: 'Store deleted successfully' })
        })
    })
})
