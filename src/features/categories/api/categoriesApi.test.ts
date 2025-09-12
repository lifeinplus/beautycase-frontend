import { act, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import server from '@/tests/mocks/server'
import { renderHookWithProvider } from '@/tests/mocks/wrappers'
import {
    mockCategories,
    mockCategory1,
    mockCategoryCreate,
} from '../api/__mocks__/categoriesApi'
import {
    useCreateCategoryMutation,
    useDeleteCategoryByIdMutation,
    useGetAllCategoriesQuery,
    useUpdateCategoryByIdMutation,
} from './categoriesApi'

describe('categoriesApi', () => {
    describe('createCategory', () => {
        it('creates a new category', async () => {
            const { result } = renderHookWithProvider(() =>
                useCreateCategoryMutation()
            )

            const [createCategory] = result.current

            await act(async () => {
                const response = await createCategory(mockCategory1).unwrap()
                expect(response).toMatchObject(mockCategoryCreate)
            })
        })

        it('returns error on failed category creation', async () => {
            server.use(
                http.post('api/categories', () =>
                    HttpResponse.json(
                        { message: 'Invalid Data' },
                        { status: 400 }
                    )
                )
            )

            const { result } = renderHookWithProvider(() =>
                useCreateCategoryMutation()
            )

            const [createCategory] = result.current

            await act(async () => {
                const response = createCategory({
                    ...mockCategory1,
                    name: '',
                }).unwrap()

                await expect(response).rejects.toThrow()
            })
        })
    })

    describe('getAllCategories', () => {
        it('gets all categories', async () => {
            const { result } = renderHookWithProvider(() =>
                useGetAllCategoriesQuery()
            )

            expect(result.current.isLoading).toBe(true)

            await waitFor(() => expect(result.current.isSuccess).toBe(true))

            expect(result.current.data).toHaveLength(2)
            expect(result.current.data).toEqual(mockCategories)
            expect(result.current.data?.[0]._id).toBe(mockCategory1._id)
        })
    })

    describe('updateCategoryById', () => {
        it('updates a category', async () => {
            const { result } = renderHookWithProvider(() =>
                useUpdateCategoryByIdMutation()
            )

            const [updateCategoryById] = result.current

            await act(async () => {
                const response = await updateCategoryById({
                    id: mockCategory1._id!,
                    category: mockCategory1,
                }).unwrap()

                expect(response).toMatchObject({
                    id: mockCategory1._id!,
                    message: 'Category updated successfully',
                })
            })
        })
    })

    describe('deleteCategoryById', () => {
        it('deletes a category', async () => {
            const { result } = renderHookWithProvider(() =>
                useDeleteCategoryByIdMutation()
            )

            const [deleteCategory] = result.current

            await act(async () => {
                const response = await deleteCategory('1').unwrap()

                expect(response).toEqual({
                    message: 'Category deleted successfully',
                })
            })
        })

        it('returns error on failed category deletion', async () => {
            server.use(
                http.delete('api/categories/999', () =>
                    HttpResponse.json(
                        { message: 'Category not found' },
                        { status: 404 }
                    )
                )
            )

            const { result } = renderHookWithProvider(() =>
                useDeleteCategoryByIdMutation()
            )

            const [deleteCategory] = result.current

            await act(async () => {
                const response = deleteCategory('999').unwrap()
                await expect(response).rejects.toThrow()
            })
        })
    })
})
