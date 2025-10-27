import { act, renderHook } from '@testing-library/react'
import toast from 'react-hot-toast'
import { useLocation, useParams } from 'react-router-dom'
import {
    afterAll,
    beforeAll,
    beforeEach,
    describe,
    expect,
    it,
    Mock,
    vi,
} from 'vitest'

import { mockLesson1 } from '@/features/lessons/api/__mocks__/lessonsApi'
import {
    useDeleteLessonByIdMutation,
    useGetLessonByIdQuery,
} from '@/features/lessons/api/lessonsApi'
import { ROUTES } from '@/shared/config/routes'
import { mockError } from '@/tests/mocks'
import { mockLocation } from '@/tests/mocks/router'
import { useDeleteLessonAction } from './useDeleteLessonAction'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/lessons/api/lessonsApi')

describe('useDeleteLessonAction', () => {
    const mockDeleteLessonById = vi.fn()
    const mockDeleteUnwrap = vi.fn()

    const spyConsoleError = vi.spyOn(console, 'error')

    vi.mocked(useLocation).mockReturnValue({
        ...mockLocation,
        pathname: ROUTES.backstage.lessons.details('123456789012345678901234'),
    })

    beforeAll(() => {
        spyConsoleError.mockImplementation(() => {})
    })

    beforeEach(() => {
        vi.mocked(useDeleteLessonByIdMutation as Mock).mockReturnValue([
            mockDeleteLessonById,
            { isLoading: false },
        ])

        mockDeleteLessonById.mockReturnValue({ unwrap: mockDeleteUnwrap })

        vi.mocked(useGetLessonByIdQuery as Mock).mockReturnValue({
            data: mockLesson1,
            isLoading: false,
            error: null,
        })
    })

    afterAll(() => {
        spyConsoleError.mockRestore()
    })

    it('handles delete action', async () => {
        const { result } = renderHook(() => useDeleteLessonAction())

        const deleteAction = result.current

        const { onConfirm } = deleteAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDeleteUnwrap).toHaveBeenCalled()
    })

    it('shows error toast if delete fails', async () => {
        mockDeleteUnwrap.mockRejectedValue(mockError)

        const { result } = renderHook(() => useDeleteLessonAction())

        const deleteAction = result.current

        const { onConfirm } = deleteAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDeleteLessonById).toHaveBeenCalledWith('123')
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')
    })

    it('returns null if no id is provided', () => {
        vi.mocked(useParams).mockReturnValue({})
        const { result } = renderHook(() => useDeleteLessonAction())
        expect(result.current).toEqual(null)
    })
})
