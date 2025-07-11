import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockQuestionnaire1 } from '@/features/questionnaires/__mocks__/questionnairesApi'
import { useGetQuestionnaireByIdQuery } from '@/features/questionnaires/questionnairesApi'
import { mockNavigate } from '@/tests/mocks/router'
import { QuestionnaireResultPage } from '../QuestionnaireResultPage'

vi.mock('@/features/questionnaires/components/QuestionnaireResult')
vi.mock('@/features/questionnaires/questionnairesApi')
vi.mock('@/shared/components/common/DataWrapper')
vi.mock('@/shared/components/navigation/NavBar')
vi.mock('@/shared/components/navigation/NavButton')
vi.mock('@/shared/components/layout/TopPanel')
vi.mock('@/shared/components/common/Hero')
vi.mock('@/shared/utils/date')

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
