import { act, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import {
    mockLesson,
    mockLessonCreate,
    mockLessons,
} from '../../../tests/mocks/handlers/lessonsHandlers'
import { server } from '../../../tests/mocks/server'
import { renderHookWithProvider } from '../../../tests/mocks/wrappers'
import {
    useAddLessonMutation,
    useDeleteLessonMutation,
    useEditLessonMutation,
    useGetLessonByIdQuery,
    useGetLessonsQuery,
} from '../lessonsApiSlice'

describe('lessonsApiSlice', () => {
    it('creates a new lesson', async () => {
        const { result } = renderHookWithProvider(() => useAddLessonMutation())

        const [addLesson] = result.current

        await act(async () => {
            const response = await addLesson(mockLesson).unwrap()

            expect(response).toMatchObject(mockLessonCreate)
        })
    })

    it('reads all lessons', async () => {
        const { result } = renderHookWithProvider(() => useGetLessonsQuery())

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toHaveLength(2)
        expect(result.current.data).toEqual(mockLessons)
        expect(result.current.data?.[0]._id).toBe(mockLesson._id)
    })

    it('reads a lesson by id', async () => {
        const { result } = renderHookWithProvider(() =>
            useGetLessonByIdQuery('lesson1')
        )

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual(mockLesson)
        expect(result.current.data?._id).toBe(mockLesson._id)
    })

    it('updates a lesson', async () => {
        const { result } = renderHookWithProvider(() => useEditLessonMutation())

        const [editLesson] = result.current

        await act(async () => {
            const response = await editLesson({
                id: 'lesson1',
                ...mockLesson,
            }).unwrap()

            expect(response).toMatchObject({
                id: mockLesson._id!,
                message: 'Lesson updated successfully',
            })
        })
    })

    it('deletes a lesson', async () => {
        const { result } = renderHookWithProvider(() =>
            useDeleteLessonMutation()
        )

        const [deleteLesson] = result.current

        await act(async () => {
            const response = await deleteLesson('1').unwrap()

            expect(response).toEqual({
                message: 'Lesson deleted successfully',
            })
        })
    })

    it('returns 400 error on failed lesson creation', async () => {
        server.use(
            http.post('api/lessons/one', () =>
                HttpResponse.json({ message: 'Invalid Data' }, { status: 400 })
            )
        )

        const { result } = renderHookWithProvider(() => useAddLessonMutation())

        const [addLesson] = result.current

        await act(async () => {
            const response = addLesson({ ...mockLesson, title: '' }).unwrap()

            await expect(response).rejects.toThrow()
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
            useDeleteLessonMutation()
        )

        const [deleteLesson] = result.current

        await act(async () => {
            const response = deleteLesson('999').unwrap()
            await expect(response).rejects.toThrow()
        })
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
