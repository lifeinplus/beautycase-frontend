import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import { mockNavigate } from '../../../../tests/mocks/router'
import { mockQuestionnaire1 } from '../../__mocks__/questionnairesApi'
import { useGetQuestionnaireByIdQuery } from '../../questionnairesApi'
import { QuestionnaireResultPage } from '../QuestionnaireResultPage'

vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/navigation/NavButton')
vi.mock('../../../../components/DataWrapper')
vi.mock('../../../../components/Hero')
vi.mock('../../../../components/TopPanel')
vi.mock('../../../../utils/date')
vi.mock('../../components/QuestionnaireResult')
vi.mock('../../questionnairesApi')

describe('QuestionnaireResultPage', () => {
    beforeEach(() => {
        vi.mocked(useGetQuestionnaireByIdQuery as Mock).mockReturnValue({
            data: mockQuestionnaire1,
            isLoading: false,
            error: null,
        })
    })

    it('renders questionnaire data', () => {
        render(<QuestionnaireResultPage />)

        expect(screen.getByTestId('mocked-top-panel')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-data-wrapper')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-nav-bar')).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-questionnaire-result')
        ).toBeInTheDocument()

        expect(screen.getByText(mockQuestionnaire1.name)).toBeInTheDocument()
    })

    it('should navigate back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<QuestionnaireResultPage />)

        const backButton = screen.getByTestId('mocked-back-button')
        await user.click(backButton)

        expect(mockNavigate).toHaveBeenCalledWith('/questionnaires')
    })
})
