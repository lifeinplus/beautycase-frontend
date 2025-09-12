import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/hooks/__mocks__/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import { mockLesson1 } from '@/features/lessons/api/__mocks__/lessonsApi'
import {
    useGetLessonByIdQuery,
    useUpdateLessonByIdMutation,
} from '@/features/lessons/api/lessonsApi'
import { mockError } from '@/shared/utils/error/__mocks__/getErrorMessage'
import { mockNavigate } from '@/tests/mocks/router'
import { LessonEdit } from './LessonEdit'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/lessons/components/form/LessonForm')
vi.mock('@/features/lessons/api/lessonsApi')
vi.mock('@/shared/utils/error/getErrorMessage')

describe('LessonEdit', () => {
    const mockUpdateLessonById = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useUpdateLessonByIdMutation as Mock).mockReturnValue([
            mockUpdateLessonById,
        ])

        mockUpdateLessonById.mockReturnValue({ unwrap: mockUnwrap })

        vi.mocked(useGetLessonByIdQuery as Mock).mockReturnValue({
            data: mockLesson1,
        })
    })

    it('renders the LessonForm with title', () => {
        render(<LessonEdit />)

        expect(screen.getByTestId('mocked-lesson-form')).toBeInTheDocument()
        expect(screen.getByText('titles.edit')).toBeInTheDocument()
    })

    it('submits lesson and navigates on success', async () => {
        const user = userEvent.setup()

        render(<LessonEdit />)

        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdateLessonById).toHaveBeenCalledWith({
            id: '123',
            lesson: mockLesson1,
        })

        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
        expect(mockNavigate).toHaveBeenCalledWith('/lessons/123')
    })

    it('shows error toast if edit fails', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<LessonEdit />)

        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdateLessonById).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)
        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
