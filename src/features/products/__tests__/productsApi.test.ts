import { act, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import server from '@/tests/mocks/server'
import { renderHookWithProvider } from '@/tests/mocks/wrappers'
import {
    mockProduct1,
    mockProductCreate,
    mockProducts,
} from '../__mocks__/productsApi'
import {
    useCreateProductMutation,
    useGetProductByIdQuery,
    useGetAllProductsQuery,
    useUpdateProductByIdMutation,
    useDeleteProductByIdMutation,
} from '../productsApi'

describe('productsApi', () => {
    describe('createProduct', () => {
        it('creates a new product', async () => {
            const { result } = renderHookWithProvider(() =>
                useCreateProductMutation()
            )

            const [createProduct] = result.current

            await act(async () => {
                const response = await createProduct(mockProduct1).unwrap()
                expect(response).toMatchObject(mockProductCreate)
            })
        })

        it('returns 400 error on failed product creation', async () => {
            server.use(
                http.post('api/products', () =>
                    HttpResponse.json(
                        { message: 'Invalid Data' },
                        { status: 400 }
                    )
                )
            )

            const { result } = renderHookWithProvider(() =>
                useCreateProductMutation()
            )

            const [createProduct] = result.current

            await act(async () => {
                const response = createProduct({
                    ...mockProduct1,
                    name: '',
                }).unwrap()

                await expect(response).rejects.toThrow()
            })
        })
    })

    describe('getAllProducts', () => {
        it('gets all products', async () => {
            const { result } = renderHookWithProvider(() =>
                useGetAllProductsQuery()
            )

            expect(result.current.isLoading).toBe(true)

            await waitFor(() => expect(result.current.isSuccess).toBe(true))

            expect(result.current.data).toHaveLength(2)
            expect(result.current.data).toEqual(mockProducts)
            expect(result.current.data?.[0]._id).toBe(mockProduct1._id)
        })
    })

    describe('getProductById', () => {
        it('gets a product by id', async () => {
            const { result } = renderHookWithProvider(() =>
                useGetProductByIdQuery('product1')
            )

            expect(result.current.isLoading).toBe(true)

            await waitFor(() => expect(result.current.isSuccess).toBe(true))

            expect(result.current.data).toEqual(mockProduct1)
            expect(result.current.data?._id).toBe(mockProduct1._id)
        })

        it('returns 404 error when product is not found', async () => {
            const { result } = renderHookWithProvider(() =>
                useGetProductByIdQuery('999')
            )

            expect(result.current.isLoading).toBe(true)

            await waitFor(() => expect(result.current.isError).toBe(true))

            expect(result.current.error).toBeDefined()
            expect(result.current.error).toHaveProperty('status', 404)
        })
    })

    describe('updateProductById', () => {
        it('updates a product', async () => {
            const { result } = renderHookWithProvider(() =>
                useUpdateProductByIdMutation()
            )

            const [updateProductById] = result.current

            await act(async () => {
                const response = await updateProductById({
                    id: mockProduct1._id!,
                    product: mockProduct1,
                }).unwrap()

                expect(response).toMatchObject({
                    id: mockProduct1._id!,
                    message: 'Product updated successfully',
                })
            })
        })
    })

    describe('deleteProductById', () => {
        it('deletes a product', async () => {
            const { result } = renderHookWithProvider(() =>
                useDeleteProductByIdMutation()
            )

            const [deleteProduct] = result.current

            await act(async () => {
                const response = await deleteProduct('1').unwrap()

                expect(response).toEqual({
                    message: 'Product deleted successfully',
                })
            })
        })

        it('returns 404 error on failed product deletion', async () => {
            server.use(
                http.delete('api/products/999', () =>
                    HttpResponse.json(
                        { message: 'Product not found' },
                        { status: 404 }
                    )
                )
            )

            const { result } = renderHookWithProvider(() =>
                useDeleteProductByIdMutation()
            )

            const [deleteProduct] = result.current

            await act(async () => {
                const response = deleteProduct('999').unwrap()
                await expect(response).rejects.toThrow()
            })
        })
    })
})
