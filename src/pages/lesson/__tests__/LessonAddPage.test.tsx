import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/__mocks__/hooks'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { mockNavigate } from '@/tests/mocks/router'
import { clearFormData } from '@/features/form/formSlice'
import {
    mockLesson1,
    mockLessonCreate,
} from '../../../features/lessons/__mocks__/lessonsApi'
import { useCreateLessonMutation } from '../../../features/lessons/lessonsApi'
import { LessonAddPage } from '../LessonAddPage'

vi.mock('@/app/hooks')
vi.mock('@/features/form/formSlice')
vi.mock('@/features/lessons/components/LessonForm')
vi.mock('@/features/lessons/lessonsApi')
vi.mock('@/shared/utils/errorUtils')

describe('LessonAddPage', () => {
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
        render(<LessonAddPage />)

        expect(screen.getByTestId('mocked-lesson-form')).toBeInTheDocument()
        expect(screen.getByText('titles.add')).toBeInTheDocument()
    })

    it('submits lesson and navigates on success', async () => {
        const user = userEvent.setup()

        render(<LessonAddPage />)
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

        render(<LessonAddPage />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockAddLesson).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })
})
