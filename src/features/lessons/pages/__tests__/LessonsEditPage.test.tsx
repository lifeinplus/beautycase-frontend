import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, it, vi, expect, beforeEach, Mock } from 'vitest'

import { mockError } from '../../../../tests/mocks'
import { mockDispatch } from '../../../../tests/mocks/app'
import { mockLesson } from '../../../../tests/mocks/handlers/lessonsHandlers'
import { mockNavigate } from '../../../../tests/mocks/router'
import { clearFormData } from '../../../form/formSlice'
import { type LessonFormProps } from '../../components/LessonForm'
import {
    useEditLessonMutation,
    useGetLessonByIdQuery,
} from '../../lessonsApiSlice'
import { LessonEditPage } from '../LessonsEditPage'

vi.mock('../../../../utils/errorUtils', () => ({
    getErrorMessage: vi.fn((error) => error.message),
}))

vi.mock('../../../form/formSlice', async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...(actual as object),
        clearFormData: vi.fn(),
        setFormData: vi.fn(),
    }
})

vi.mock('../../components/LessonForm', () => ({
    LessonForm: ({ title, onSubmit }: LessonFormProps) => (
        <div data-testid="lesson-form">
            <h1>{title}</h1>
            <button
                data-testid="submit-button"
                onClick={() => onSubmit(mockLesson)}
            >
                Submit
            </button>
        </div>
    ),
}))

vi.mock('../../lessonsApiSlice', () => ({
    useEditLessonMutation: vi.fn(),
    useGetLessonByIdQuery: vi.fn(),
}))

describe('LessonEditPage', () => {
    const mockEditLesson = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useEditLessonMutation as Mock).mockReturnValue([
            mockEditLesson,
        ])

        mockEditLesson.mockReturnValue({ unwrap: mockUnwrap })

        vi.mocked(useGetLessonByIdQuery as Mock).mockReturnValue({
            data: mockLesson,
        })
    })

    it('renders the LessonForm with title', () => {
        render(<LessonEditPage />)

        const form = screen.getByTestId('lesson-form')
        const title = screen.getByText('Редактировать урок')

        expect(form).toBeInTheDocument()
        expect(title).toBeInTheDocument()
    })

    it('submits lesson and navigates on success', async () => {
        const user = userEvent.setup()

        render(<LessonEditPage />)

        const button = screen.getByTestId('submit-button')
        await user.click(button)

        expect(mockEditLesson).toHaveBeenCalledWith({
            id: '123',
            ...mockLesson,
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

        render(<LessonEditPage />)

        const button = screen.getByTestId('submit-button')
        await user.click(button)

        expect(mockEditLesson).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)
        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
