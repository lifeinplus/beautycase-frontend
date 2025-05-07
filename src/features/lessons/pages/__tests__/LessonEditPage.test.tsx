import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, it, vi, expect, beforeEach, Mock } from 'vitest'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { mockNavigate } from '../../../../tests/mocks/router'
import { mockError } from '../../../../utils/__mocks__/errorUtils'
import { clearFormData } from '../../../form/formSlice'
import { mockLesson } from '../../__mocks__/lessonsApiSlice'
import {
    useEditLessonMutation,
    useGetLessonByIdQuery,
} from '../../lessonsApiSlice'
import { LessonEditPage } from '../LessonEditPage'

vi.mock('../../../../app/hooks')
vi.mock('../../../../utils/errorUtils')
vi.mock('../../../form/formSlice')
vi.mock('../../components/LessonForm')
vi.mock('../../lessonsApiSlice')

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

        const form = screen.getByTestId('mocked-lesson-form')
        const title = screen.getByText('Редактировать урок')

        expect(form).toBeInTheDocument()
        expect(title).toBeInTheDocument()
    })

    it('submits lesson and navigates on success', async () => {
        const user = userEvent.setup()

        render(<LessonEditPage />)

        const button = screen.getByTestId('mocked-submit-button')
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

        const button = screen.getByTestId('mocked-submit-button')
        await user.click(button)

        expect(mockEditLesson).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)
        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
