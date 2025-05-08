import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import { mockNavigate } from '../../../../tests/mocks/router'
import { mockQuestionnaire } from '../../__mocks__/questionnairesApiSlice'
import { useGetQuestionnaireByIdQuery } from '../../questionnairesApiSlice'
import { QuestionnaireResultPage } from '../QuestionnaireResultPage'

vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/navigation/NavigationButton')
vi.mock('../../../../components/DataWrapper')
vi.mock('../../../../components/Hero')
vi.mock('../../../../components/TopPanel')
vi.mock('../../../../utils/date')
vi.mock('../../components/QuestionnaireResult')
vi.mock('../../questionnairesApiSlice')

describe('QuestionnaireResultPage', () => {
    beforeEach(() => {
        vi.mocked(useGetQuestionnaireByIdQuery as Mock).mockReturnValue({
            data: mockQuestionnaire,
            isLoading: false,
            error: null,
        })
    })

    it('renders questionnaire data', () => {
        render(<QuestionnaireResultPage />)

        const topPanel = screen.getByTestId('mocked-top-panel')
        const dataWrapper = screen.getByTestId('mocked-data-wrapper')
        const questionnaireResult = screen.getByTestId(
            'mocked-questionnaire-result'
        )
        const name = screen.getByText(mockQuestionnaire.name)
        const navBar = screen.getByTestId('mocked-nav-bar')
        const navButton = screen.getByTestId('mocked-nav-button-Назад')

        expect(topPanel).toBeInTheDocument()
        expect(dataWrapper).toBeInTheDocument()
        expect(questionnaireResult).toBeInTheDocument()
        expect(name).toBeInTheDocument()
        expect(navBar).toBeInTheDocument()
        expect(navButton).toBeInTheDocument()
    })

    it('should navigate back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<QuestionnaireResultPage />)

        const backButton = screen.getByTestId('mocked-back-button')
        await user.click(backButton)

        expect(mockNavigate).toHaveBeenCalledWith('/questionnaires')
    })
})
