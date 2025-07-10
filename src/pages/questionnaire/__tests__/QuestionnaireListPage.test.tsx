import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'

import { mockQuestionnaires } from '@/features/questionnaires/__mocks__/questionnairesApi'
import { useGetAllQuestionnairesQuery } from '@/features/questionnaires/questionnairesApi'
import { QuestionnaireListPage } from '../QuestionnaireListPage'

vi.mock('@/features/questionnaires/components/QuestionnaireMobileView')
vi.mock('@/features/questionnaires/components/QuestionnaireTable')
vi.mock('@/features/questionnaires/questionnairesApi')
vi.mock('@/shared/components/common/DataWrapper')
vi.mock('@/shared/components/navigation/NavBar')
vi.mock('@/shared/components/layout/Header')
vi.mock('@/shared/components/common/Hero')

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
