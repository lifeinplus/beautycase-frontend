import { act, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import server from '@/tests/mocks/server'
import { renderHookWithProvider } from '@/tests/mocks/wrappers'
import {
    mockBrand1,
    mockBrandCreate,
    mockBrands,
} from '../api/__mocks__/brandsApi'
import {
    useCreateBrandMutation,
    useDeleteBrandByIdMutation,
    useGetAllBrandsQuery,
    useUpdateBrandByIdMutation,
} from '../api/brandsApi'

describe('brandsApi', () => {
    describe('createBrand', () => {
        it('creates a new brand', async () => {
            const { result } = renderHookWithProvider(() =>
                useCreateBrandMutation()
            )

            const [createBrand] = result.current

            await act(async () => {
                const response = await createBrand(mockBrand1).unwrap()
                expect(response).toMatchObject(mockBrandCreate)
            })
        })

        it('returns error on failed brand creation', async () => {
            server.use(
                http.post('api/brands', () =>
                    HttpResponse.json(
                        { message: 'Invalid Data' },
                        { status: 400 }
                    )
                )
            )

            const { result } = renderHookWithProvider(() =>
                useCreateBrandMutation()
            )

            const [createBrand] = result.current

            await act(async () => {
                const response = createBrand({
                    ...mockBrand1,
                    name: '',
                }).unwrap()

                await expect(response).rejects.toThrow()
            })
        })
    })

    describe('getAllBrands', () => {
        it('gets all brands', async () => {
            const { result } = renderHookWithProvider(() =>
                useGetAllBrandsQuery()
            )

            expect(result.current.isLoading).toBe(true)

            await waitFor(() => expect(result.current.isSuccess).toBe(true))

            expect(result.current.data).toHaveLength(2)
            expect(result.current.data).toEqual(mockBrands)
            expect(result.current.data?.[0]._id).toBe(mockBrand1._id)
        })
    })

    describe('updateBrandById', () => {
        it('updates a brand', async () => {
            const { result } = renderHookWithProvider(() =>
                useUpdateBrandByIdMutation()
            )

            const [updateBrandById] = result.current

            await act(async () => {
                const response = await updateBrandById({
                    id: mockBrand1._id!,
                    brand: mockBrand1,
                }).unwrap()

                expect(response).toMatchObject({ id: mockBrand1._id! })
            })
        })
    })

    describe('deleteBrandById', () => {
        it('deletes a brand', async () => {
            const { result } = renderHookWithProvider(() =>
                useDeleteBrandByIdMutation()
            )

            const [deleteBrand] = result.current

            await act(async () => {
                const response = await deleteBrand('1').unwrap()

                expect(response).toEqual({
                    message: 'Brand deleted successfully',
                })
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
                useDeleteBrandByIdMutation()
            )

            const [deleteBrand] = result.current

            await act(async () => {
                const response = deleteBrand('999').unwrap()
                await expect(response).rejects.toThrow()
            })
        })
    })
})
