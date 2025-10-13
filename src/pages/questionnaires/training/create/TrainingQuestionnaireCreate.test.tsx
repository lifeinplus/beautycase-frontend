import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockTrainingQuestionnaire1 } from '@/features/questionnaires/api/__mocks__/questionnairesApi'
import { useCreateTrainingQuestionnaireMutation } from '@/features/questionnaires/api/questionnairesApi'
import { trainingQuestionnaireQuestions } from '@/features/questionnaires/training/questions/trainingQuestionnaireQuestions'
import { mockError } from '@/tests/mocks'
import { mockNavigate } from '@/tests/mocks/router'
import { TrainingQuestionnaireCreate } from './TrainingQuestionnaireCreate'

vi.mock('@/features/questionnaires/api/questionnairesApi')
vi.mock('@/shared/components/hero/Hero')

describe('TrainingQuestionnaireCreate', () => {
    const mockCreate = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(
            useCreateTrainingQuestionnaireMutation as Mock
        ).mockReturnValue([mockCreate, { isLoading: false }])

        mockCreate.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})
    })

    it('renders all required form fields', () => {
        render(<TrainingQuestionnaireCreate />)

        const placeholders = [
            'training.fields.name.label',
            'training.fields.contact.label',
            'training.fields.difficulties.label',
            'training.fields.expectations.label',
        ]

        placeholders.forEach((placeholder) => {
            expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
        })

        expect(
            screen.getByText('training.fields.experience.label')
        ).toBeInTheDocument()
    })

    it('calls addQuestionnaire and navigates on successful submission', async () => {
        const user = userEvent.setup()

        render(<TrainingQuestionnaireCreate />)

        await user.type(
            screen.getByPlaceholderText(
                trainingQuestionnaireQuestions.name.label
            ),
            mockTrainingQuestionnaire1.name
        )

        await user.type(
            screen.getByPlaceholderText(
                trainingQuestionnaireQuestions.contact.label
            ),
            mockTrainingQuestionnaire1.contact
        )

        await user.type(
            screen.getByPlaceholderText(
                trainingQuestionnaireQuestions.expectations.label
            ),
            mockTrainingQuestionnaire1.expectations
        )

        await user.click(screen.getByRole('button', { name: 'send' }))

        expect(mockCreate).toHaveBeenCalledWith({
            name: mockTrainingQuestionnaire1.name,
            contact: mockTrainingQuestionnaire1.contact,
            expectations: mockTrainingQuestionnaire1.expectations,
        })

        expect(mockUnwrap).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('/confirmation')
    })

    it('calls navigate when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<TrainingQuestionnaireCreate />)

        await user.click(
            screen.getAllByRole('navigation')[0].querySelector('button')!
        )

        expect(mockNavigate).toHaveBeenCalledWith('/questionnaires')
    })

    it('displays an error toast if submission fails', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<TrainingQuestionnaireCreate />)

        await user.type(
            screen.getByPlaceholderText(
                trainingQuestionnaireQuestions.name.label
            ),
            mockTrainingQuestionnaire1.name
        )

        await user.type(
            screen.getByPlaceholderText(
                trainingQuestionnaireQuestions.contact.label
            ),
            mockTrainingQuestionnaire1.contact
        )

        await user.type(
            screen.getByPlaceholderText(
                trainingQuestionnaireQuestions.expectations.label
            ),
            mockTrainingQuestionnaire1.expectations
        )

        await user.click(screen.getByRole('button', { name: 'send' }))

        expect(mockCreate).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')

        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
