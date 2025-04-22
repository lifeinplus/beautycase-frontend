import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, it, vi, expect, beforeEach, Mock } from 'vitest'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { mockNavigate } from '../../../../tests/mocks/router'
import { mockError } from '../../../../utils/__mocks__/errorUtils'
import { clearFormData } from '../../../form/formSlice'
import { mockLesson, mockLessonCreate } from '../../__mocks__/lessonsApiSlice'
import { useAddLessonMutation } from '../../lessonsApiSlice'
import { LessonAddPage } from '../LessonAddPage'

vi.mock('../../../../app/hooks')
vi.mock('../../../../utils/errorUtils')
vi.mock('../../../form/formSlice')
vi.mock('../../components/LessonForm')
vi.mock('../../lessonsApiSlice')

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

        expect(screen.getByTestId('mocked-lesson-form')).toBeInTheDocument()
        expect(screen.getByText('Добавить урок')).toBeInTheDocument()
    })

    it('submits lesson and navigates on success', async () => {
        const user = userEvent.setup()

        render(<LessonAddPage />)

        const button = screen.getByTestId('mocked-submit-button')
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

        const button = screen.getByTestId('mocked-submit-button')
        await user.click(button)

        expect(mockAddLesson).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })
})
