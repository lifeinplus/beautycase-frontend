import { act, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import {
    mockProduct,
    mockProducts,
    renderWithProvider,
    server,
} from '../../../mocks'
import {
    useAddProductMutation,
    useDeleteProductMutation,
    useEditProductMutation,
    useGetProductByIdQuery,
    useGetProductsQuery,
} from '../productApiSlice'

describe('productsApiSlice', () => {
    it('creates a new product', async () => {
        const { result } = renderWithProvider(() => useAddProductMutation())

        const [addProduct] = result.current

        await act(async () => {
            const response = await addProduct(mockProduct).unwrap()

            expect(response).toMatchObject({
                count: 1,
                id: 3,
                message: 'Product created successfully',
            })
        })
    })

    it('reads all products', async () => {
        const { result } = renderWithProvider(() => useGetProductsQuery())

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toHaveLength(2)
        expect(result.current.data).toEqual(mockProducts)
        expect(result.current.data?.[0]._id).toBe(mockProduct._id)
    })

    it('reads a product by id', async () => {
        const { result } = renderWithProvider(() => useGetProductByIdQuery('1'))

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual(mockProduct)
        expect(result.current.data?._id).toBe(mockProduct._id)
    })

    it('updates a product', async () => {
        const { result } = renderWithProvider(() => useEditProductMutation())

        const [editProduct] = result.current

        await act(async () => {
            const response = await editProduct({
                id: '1',
                body: mockProduct,
            }).unwrap()

            expect(response).toMatchObject({
                id: mockProduct._id!,
                message: 'Product updated successfully',
            })
        })
    })

    it('deletes a product', async () => {
        const { result } = renderWithProvider(() => useDeleteProductMutation())

        const [deleteProduct] = result.current

        await act(async () => {
            const response = await deleteProduct('1').unwrap()

            expect(response).toEqual({
                message: 'Product deleted successfully',
            })
        })
    })

    it('returns 400 error on failed product creation', async () => {
        server.use(
            http.post('api/products/one', () =>
                HttpResponse.json({ message: 'Invalid Data' }, { status: 400 })
            )
        )

        const { result } = renderWithProvider(() => useAddProductMutation())

        const [addProduct] = result.current

        await act(async () => {
            const response = addProduct({ ...mockProduct, name: '' }).unwrap()

            await expect(response).rejects.toThrow()
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

        const { result } = renderWithProvider(() => useDeleteProductMutation())

        const [deleteProduct] = result.current

        await act(async () => {
            const response = deleteProduct('999').unwrap()
            await expect(response).rejects.toThrow()
        })
    })

    it('returns 404 error when product is not found', async () => {
        const { result } = renderWithProvider(() =>
            useGetProductByIdQuery('999')
        )

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isError).toBe(true))

        expect(result.current.error).toBeDefined()
        expect(result.current.error).toHaveProperty('status', 404)
    })
})
