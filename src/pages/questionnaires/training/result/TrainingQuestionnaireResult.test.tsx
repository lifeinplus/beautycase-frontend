import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockTrainingQuestionnaire1 } from '@/features/questionnaires/api/__mocks__/questionnairesApi'
import { useGetTrainingQuestionnaireByIdQuery } from '@/features/questionnaires/api/questionnairesApi'
import { mockNavigate } from '@/tests/mocks/router'
import { TrainingQuestionnaireResult } from './TrainingQuestionnaireResult'

vi.mock('@/features/questionnaires/api/questionnairesApi')
vi.mock(
    '@/features/questionnaires/training/components/data/TrainingQuestionnaireData'
)
vi.mock('@/shared/components/layout/top-panel/TopPanel')
vi.mock('@/shared/utils/date/formatDate')

describe('TrainingQuestionnaireResult', () => {
    beforeEach(() => {
        vi.mocked(useGetTrainingQuestionnaireByIdQuery as Mock).mockReturnValue(
            {
                data: mockTrainingQuestionnaire1,
                isLoading: false,
                error: null,
            }
        )
    })

    it('renders questionnaire data', () => {
        render(<TrainingQuestionnaireResult />)

        expect(screen.getByTestId('mocked-top-panel')).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-training-questionnaire-data')
        ).toBeInTheDocument()

        expect(
            screen.getAllByText(mockTrainingQuestionnaire1.name)
        ).toHaveLength(3)
    })

    it('should navigate back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<TrainingQuestionnaireResult />)
        await user.click(screen.getByTestId('mocked-back-button'))

        expect(mockNavigate).toHaveBeenCalledWith('/questionnaires/trainings')
    })
})
