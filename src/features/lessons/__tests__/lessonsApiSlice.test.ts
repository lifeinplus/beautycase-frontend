import { act, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import {
    mockLesson,
    mockLessons,
    renderWithProvider,
    server,
} from '../../../mocks'
import {
    useAddLessonMutation,
    useDeleteLessonMutation,
    useEditLessonMutation,
    useGetLessonByIdQuery,
    useGetLessonsQuery,
} from '../lessonsApiSlice'

describe('lessonsApiSlice', () => {
    it('creates a new lesson', async () => {
        const { result } = renderWithProvider(() => useAddLessonMutation())

        const [addLesson] = result.current

        await act(async () => {
            const response = await addLesson(mockLesson).unwrap()

            expect(response).toMatchObject({
                count: 1,
                id: 3,
                message: 'Lesson created successfully',
            })
        })
    })

    it('reads all lessons', async () => {
        const { result } = renderWithProvider(() => useGetLessonsQuery())

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toHaveLength(2)
        expect(result.current.data).toEqual(mockLessons)
        expect(result.current.data?.[0]._id).toBe(mockLesson._id)
    })

    it('reads a lesson by id', async () => {
        const { result } = renderWithProvider(() => useGetLessonByIdQuery('1'))

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual(mockLesson)
        expect(result.current.data?._id).toBe(mockLesson._id)
    })

    it('updates a lesson', async () => {
        const { result } = renderWithProvider(() => useEditLessonMutation())

        const [editLesson] = result.current

        await act(async () => {
            const response = await editLesson({
                id: '1',
                ...mockLesson,
            }).unwrap()

            expect(response).toMatchObject({
                id: mockLesson._id!,
                message: 'Lesson updated successfully',
            })
        })
    })

    it('deletes a lesson', async () => {
        const { result } = renderWithProvider(() => useDeleteLessonMutation())

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

        const { result } = renderWithProvider(() => useAddLessonMutation())

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

        const { result } = renderWithProvider(() => useDeleteLessonMutation())

        const [deleteLesson] = result.current

        await act(async () => {
            const response = deleteLesson('999').unwrap()
            await expect(response).rejects.toThrow()
        })
    })

    it('returns 404 error when lesson is not found', async () => {
        const { result } = renderWithProvider(() =>
            useGetLessonByIdQuery('999')
        )

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isError).toBe(true))

        expect(result.current.error).toBeDefined()
        expect(result.current.error).toHaveProperty('status', 404)
    })
})
