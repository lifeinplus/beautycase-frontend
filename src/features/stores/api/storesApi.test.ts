import { act, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderHookWithProvider } from '@/tests/mocks/wrappers'
import {
    mockStore1,
    mockStoreCreate,
    mockStores,
} from '../api/__mocks__/storesApi'
import {
    useCreateStoreMutation,
    useDeleteStoreByIdMutation,
    useGetAllStoresQuery,
    useUpdateStoreByIdMutation,
} from './storesApi'

describe('storesApi', () => {
    describe('createStore', () => {
        it('creates a new store successfully', async () => {
            const { result } = renderHookWithProvider(() =>
                useCreateStoreMutation()
            )

            const [createStore] = result.current

            await act(async () => {
                const response = await createStore(mockStore1).unwrap()
                expect(response).toMatchObject(mockStoreCreate)
            })
        })
    })

    describe('getAllStores', () => {
        it('gets all stores successfully', async () => {
            const { result } = renderHookWithProvider(() =>
                useGetAllStoresQuery()
            )

            expect(result.current.isLoading).toBe(true)

            await waitFor(() => expect(result.current.isSuccess).toBe(true))

            expect(result.current.data).toEqual(mockStores)
        })
    })

    describe('updateStoreById', () => {
        it('updates a store successfully', async () => {
            const { result } = renderHookWithProvider(() =>
                useUpdateStoreByIdMutation()
            )

            const [updateStoreById] = result.current

            await act(async () => {
                const response = await updateStoreById({
                    id: mockStore1._id!,
                    store: mockStore1,
                }).unwrap()

                expect(response).toMatchObject({
                    id: mockStore1._id!,
                })
            })
        })
    })

    describe('deleteStoreById', () => {
        it('deletes a store successfully', async () => {
            const { result } = renderHookWithProvider(() =>
                useDeleteStoreByIdMutation()
            )

            const [deleteStore] = result.current

            await act(async () => {
                await deleteStore(mockStore1._id!).unwrap()
            })
        })
    })
})
