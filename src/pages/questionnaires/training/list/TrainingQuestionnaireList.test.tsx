import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'

import { mockTrainingQuestionnaires } from '@/features/questionnaires/api/__mocks__/questionnairesApi'
import { useGetAllTrainingQuestionnairesQuery } from '@/features/questionnaires/api/questionnairesApi'
import { mockNavigate } from '@/tests/mocks/router'
import userEvent from '@testing-library/user-event'
import { TrainingQuestionnaireList } from './TrainingQuestionnaireList'

vi.mock('@/features/questionnaires/api/questionnairesApi')
vi.mock(
    '@/features/questionnaires/training/components/mobile-view/TrainingQuestionnaireMobileView'
)
vi.mock(
    '@/features/questionnaires/training/components/table/TrainingQuestionnaireTable'
)
vi.mock('@/shared/components/layout/top-panel/TopPanel')

describe('TrainingQuestionnaireList', () => {
    beforeEach(() => {
        vi.mocked(useGetAllTrainingQuestionnairesQuery as Mock).mockReturnValue(
            {
                data: mockTrainingQuestionnaires,
                isLoading: false,
                error: null,
            }
        )
    })

    it('renders the component with correct structure', () => {
        render(<TrainingQuestionnaireList />)

        expect(screen.getByTestId('mocked-top-panel')).toBeInTheDocument()
        expect(screen.getAllByText(/headlineList/)).toHaveLength(2)
        expect(screen.getAllByText(/training.hero.byline/)).toHaveLength(2)
    })

    it('renders page components and list views', () => {
        render(<TrainingQuestionnaireList />)

        expect(
            screen.getByTestId('mocked-training-questionnaire-mobile-view')
        ).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-training-questionnaire-table')
        ).toBeInTheDocument()
    })

    it('calls navigate when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<TrainingQuestionnaireList />)
        await user.click(screen.getByTestId('mocked-back-button'))

        expect(mockNavigate).toHaveBeenCalledWith('/questionnaires')
    })
})
