import { act, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import {
    mockBrand,
    mockBrands,
    mockBrandCreate,
} from '../../../tests/mocks/handlers/brandsHandlers'
import { server } from '../../../tests/mocks/server'
import { renderHookWithProvider } from '../../../tests/mocks/wrappers'
import {
    useCreateBrandMutation,
    useDeleteBrandMutation,
    useReadBrandsQuery,
    useUpdateBrandMutation,
} from '../brandsApiSlice'

describe('brandsApiSlice', () => {
    it('creates a new brand', async () => {
        const { result } = renderHookWithProvider(() =>
            useCreateBrandMutation()
        )

        const [addBrand] = result.current

        await act(async () => {
            const response = await addBrand(mockBrand).unwrap()
            expect(response).toMatchObject(mockBrandCreate)
        })
    })

    it('reads all brands', async () => {
        const { result } = renderHookWithProvider(() => useReadBrandsQuery())

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toHaveLength(2)
        expect(result.current.data).toEqual(mockBrands)
        expect(result.current.data?.[0]._id).toBe(mockBrand._id)
    })

    it('updates a brand', async () => {
        const { result } = renderHookWithProvider(() =>
            useUpdateBrandMutation()
        )

        const [editBrand] = result.current

        await act(async () => {
            const response = await editBrand(mockBrand).unwrap()

            expect(response).toMatchObject({
                id: mockBrand._id!,
                message: 'Brand updated successfully',
            })
        })
    })

    it('deletes a brand', async () => {
        const { result } = renderHookWithProvider(() =>
            useDeleteBrandMutation()
        )

        const [deleteBrand] = result.current

        await act(async () => {
            const response = await deleteBrand('1').unwrap()

            expect(response).toEqual({
                message: 'Brand deleted successfully',
            })
        })
    })

    it('returns error on failed brand creation', async () => {
        server.use(
            http.post('api/brands', () =>
                HttpResponse.json({ message: 'Invalid Data' }, { status: 400 })
            )
        )

        const { result } = renderHookWithProvider(() =>
            useCreateBrandMutation()
        )

        const [createBrand] = result.current

        await act(async () => {
            const response = createBrand({ ...mockBrand, name: '' }).unwrap()

            await expect(response).rejects.toThrow()
        })
    })

    it('returns error on failed brand deletion', async () => {
        server.use(
            http.delete('api/brands/999', () =>
                HttpResponse.json(
                    { message: 'Brand not found' },
                    { status: 404 }
                )
            )
        )

        const { result } = renderHookWithProvider(() =>
            useDeleteBrandMutation()
        )

        const [deleteBrand] = result.current

        await act(async () => {
            const response = deleteBrand('999').unwrap()
            await expect(response).rejects.toThrow()
        })
    })
})
