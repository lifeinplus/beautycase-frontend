import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'

import { mockQuestionnaires } from '../../__mocks__/questionnairesApi'
import { useGetAllQuestionnairesQuery } from '../../questionnairesApi'
import { QuestionnaireListPage } from '../QuestionnaireListPage'

vi.mock('@/shared/components/common/DataWrapper')
vi.mock('@/shared/components/navigation/NavBar')
vi.mock('@/shared/components/layout/Header')
vi.mock('@/shared/components/common/Hero')
vi.mock('../../components/QuestionnaireMobileView')
vi.mock('../../components/QuestionnaireTable')
vi.mock('../../questionnairesApi')

describe('QuestionnaireListPage', () => {
    beforeEach(() => {
        vi.mocked(useGetAllQuestionnairesQuery as Mock).mockReturnValue({
            data: mockQuestionnaires,
            isLoading: false,
            error: null,
        })
    })

    it('renders the component with correct structure', () => {
        render(<QuestionnaireListPage />)

        expect(screen.getByTestId('mocked-header')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-hero')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-data-wrapper')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-nav-bar')).toBeInTheDocument()
    })

    it('renders page components and list views', () => {
        render(<QuestionnaireListPage />)

        expect(
            screen.getByTestId('mocked-questionnaire-mobile-view')
        ).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-questionnaire-table')
        ).toBeInTheDocument()
    })
})
