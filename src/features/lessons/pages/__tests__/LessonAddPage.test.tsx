import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, it, vi, expect, beforeEach, Mock } from 'vitest'

import { mockError } from '../../../../tests/mocks'
import { mockDispatch } from '../../../../tests/mocks/app'
import {
    mockLesson,
    mockLessonCreate,
} from '../../../../tests/mocks/handlers/lessonsHandlers'
import { mockNavigate } from '../../../../tests/mocks/router'
import { clearFormData } from '../../../form/formSlice'
import { type LessonFormProps } from '../../components/LessonForm'
import { useAddLessonMutation } from '../../lessonsApiSlice'
import { LessonAddPage } from '../LessonAddPage'

vi.mock('../../../../utils/errorUtils', () => ({
    getErrorMessage: vi.fn((error) => error.message),
}))

vi.mock('../../../form/formSlice', async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...(actual as object),
        clearFormData: vi.fn(),
    }
})

vi.mock('../../lessonsApiSlice', () => ({
    useAddLessonMutation: vi.fn(),
}))

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

describe('LessonAddPage', () => {
    const mockAddLesson = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useAddLessonMutation as Mock).mockReturnValue([mockAddLesson])

        mockAddLesson.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue(mockLessonCreate)
    })

    it('renders the LessonForm with title', () => {
        render(<LessonAddPage />)

        expect(screen.getByTestId('lesson-form')).toBeInTheDocument()
        expect(screen.getByText('Добавить урок')).toBeInTheDocument()
    })

    it('submits lesson and navigates on success', async () => {
        const user = userEvent.setup()

        render(<LessonAddPage />)

        const button = screen.getByTestId('submit-button')
        await user.click(button)

        expect(mockAddLesson).toHaveBeenCalledWith(mockLesson)
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
        expect(mockNavigate).toHaveBeenCalledWith('/lessons/lesson3')
    })

    it('displays error toast on failure', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<LessonAddPage />)

        const button = screen.getByTestId('submit-button')
        await user.click(button)

        expect(mockAddLesson).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })
})
