import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'

import { mockQuestionnaires } from '../../__mocks__/questionnairesApi'
import { useReadQuestionnairesQuery } from '../../questionnairesApi'
import { QuestionnaireListPage } from '../QuestionnaireListPage'

vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/DataWrapper')
vi.mock('../../../../components/Header')
vi.mock('../../../../components/Hero')
vi.mock('../../components/QuestionnaireMobileView')
vi.mock('../../components/QuestionnaireTable')
vi.mock('../../questionnairesApi')

describe('QuestionnaireListPage', () => {
    beforeEach(() => {
        vi.mocked(useReadQuestionnairesQuery as Mock).mockReturnValue({
            data: mockQuestionnaires,
            isLoading: false,
            error: null,
        })
    })

    it('renders the component with correct structure', () => {
        render(<QuestionnaireListPage />)

        const header = screen.getByTestId('mocked-header')
        const hero = screen.getByTestId('mocked-hero')
        const dataWrapper = screen.getByTestId('mocked-data-wrapper')
        const navBar = screen.getByTestId('mocked-nav-bar')

        expect(header).toBeInTheDocument()
        expect(hero).toBeInTheDocument()
        expect(dataWrapper).toBeInTheDocument()
        expect(navBar).toBeInTheDocument()
    })

    it('renders page components and list views', () => {
        render(<QuestionnaireListPage />)

        const mobileView = screen.getByTestId(
            'mocked-questionnaire-mobile-view'
        )

        const table = screen.getByTestId('mocked-questionnaire-table')

        expect(mobileView).toBeInTheDocument()
        expect(table).toBeInTheDocument()
    })
})
