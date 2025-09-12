import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/hooks/__mocks__/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import {
    mockLesson1,
    mockLessonCreate,
} from '@/features/lessons/api/__mocks__/lessonsApi'
import { useCreateLessonMutation } from '@/features/lessons/api/lessonsApi'
import { mockError } from '@/shared/utils/error/__mocks__/getErrorMessage'
import { mockNavigate } from '@/tests/mocks/router'
import { LessonAdd } from './LessonAdd'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/lessons/components/form/LessonForm')
vi.mock('@/features/lessons/api/lessonsApi')
vi.mock('@/shared/utils/error/getErrorMessage')

describe('LessonAdd', () => {
    const mockAddLesson = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useCreateLessonMutation as Mock).mockReturnValue([
            mockAddLesson,
        ])

        mockAddLesson.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue(mockLessonCreate)
    })

    it('renders the LessonForm with title', () => {
        render(<LessonAdd />)

        expect(screen.getByTestId('mocked-lesson-form')).toBeInTheDocument()
        expect(screen.getByText('titles.add')).toBeInTheDocument()
    })

    it('submits lesson and navigates on success', async () => {
        const user = userEvent.setup()

        render(<LessonAdd />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockAddLesson).toHaveBeenCalledWith(mockLesson1)
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
        expect(mockNavigate).toHaveBeenCalledWith('/lessons/lesson3')
    })

    it('displays error toast on failure', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<LessonAdd />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockAddLesson).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })
})
