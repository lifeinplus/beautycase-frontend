import { act, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import server from '@/tests/mocks/server'
import { renderHookWithProvider } from '@/tests/mocks/wrappers'
import {
    mockLesson1,
    mockLessonCreate,
    mockLessons,
} from '../api/__mocks__/lessonsApi'
import {
    useCreateLessonMutation,
    useDeleteLessonByIdMutation,
    useGetAllLessonsQuery,
    useGetLessonByIdQuery,
    useUpdateLessonByIdMutation,
} from './lessonsApi'

describe('lessonsApi', () => {
    describe('createLesson', () => {
        it('creates a new lesson', async () => {
            const { result } = renderHookWithProvider(() =>
                useCreateLessonMutation()
            )

            const [createLesson] = result.current

            await act(async () => {
                const response = await createLesson(mockLesson1).unwrap()

                expect(response).toMatchObject(mockLessonCreate)
            })
        })

        it('returns 400 error on failed lesson creation', async () => {
            server.use(
                http.post('api/lessons', () =>
                    HttpResponse.json(
                        { message: 'Invalid Data' },
                        { status: 400 }
                    )
                )
            )

            const { result } = renderHookWithProvider(() =>
                useCreateLessonMutation()
            )

            const [createLesson] = result.current

            await act(async () => {
                const response = createLesson({
                    ...mockLesson1,
                    title: '',
                }).unwrap()

                await expect(response).rejects.toThrow()
            })
        })
    })

    describe('getAllLessons', () => {
        it('gets all lessons', async () => {
            const { result } = renderHookWithProvider(() =>
                useGetAllLessonsQuery()
            )

            expect(result.current.isLoading).toBe(true)

            await waitFor(() => expect(result.current.isSuccess).toBe(true))

            expect(result.current.data).toHaveLength(2)
            expect(result.current.data).toEqual(mockLessons)
            expect(result.current.data?.[0]._id).toBe(mockLesson1._id)
        })
    })

    describe('getLessonById', () => {
        it('gets a lesson by id', async () => {
            const { result } = renderHookWithProvider(() =>
                useGetLessonByIdQuery('lesson1')
            )

            expect(result.current.isLoading).toBe(true)

            await waitFor(() => expect(result.current.isSuccess).toBe(true))

            expect(result.current.data).toEqual(mockLesson1)
            expect(result.current.data?._id).toBe(mockLesson1._id)
        })

        it('returns 404 error when lesson is not found', async () => {
            const { result } = renderHookWithProvider(() =>
                useGetLessonByIdQuery('999')
            )

            expect(result.current.isLoading).toBe(true)

            await waitFor(() => expect(result.current.isError).toBe(true))

            expect(result.current.error).toBeDefined()
            expect(result.current.error).toHaveProperty('status', 404)
        })
    })

    describe('updateLessonById', () => {
        it('updates a lesson', async () => {
            const { result } = renderHookWithProvider(() =>
                useUpdateLessonByIdMutation()
            )

            const [updateLessonById] = result.current

            await act(async () => {
                const response = await updateLessonById({
                    id: mockLesson1._id!,
                    lesson: mockLesson1,
                }).unwrap()

                expect(response).toMatchObject({ id: mockLesson1._id! })
            })
        })
    })

    describe('deleteLessonById', () => {
        it('deletes a lesson', async () => {
            const { result } = renderHookWithProvider(() =>
                useDeleteLessonByIdMutation()
            )

            const [deleteLesson] = result.current

            await act(async () => {
                await deleteLesson('1').unwrap()
            })
        })

        it('returns 404 error on failed lesson deletion', async () => {
            server.use(
                http.delete('api/lessons/999', () =>
                    HttpResponse.json(
                        { message: 'Lesson not found' },
                        { status: 404 }
                    )
                )
            )

            const { result } = renderHookWithProvider(() =>
                useDeleteLessonByIdMutation()
            )

            const [deleteLesson] = result.current

            await act(async () => {
                const response = deleteLesson('999').unwrap()
                await expect(response).rejects.toThrow()
            })
        })
    })
})
