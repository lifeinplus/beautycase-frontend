import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'

import { mockQuestionnaires } from '@/features/questionnaires/__mocks__/questionnairesApi'
import { useGetAllQuestionnairesQuery } from '@/features/questionnaires/questionnairesApi'
import { QuestionnaireList } from './QuestionnaireList'

vi.mock('@/features/questionnaires/components/QuestionnaireMobileView')
vi.mock('@/features/questionnaires/components/QuestionnaireTable')
vi.mock('@/features/questionnaires/questionnairesApi')
vi.mock('@/shared/components/common/Hero')
vi.mock('@/shared/components/layout/Header')

describe('QuestionnaireList', () => {
    beforeEach(() => {
        vi.mocked(useGetAllQuestionnairesQuery as Mock).mockReturnValue({
            data: mockQuestionnaires,
            isLoading: false,
            error: null,
        })
    })

    it('renders the component with correct structure', () => {
        render(<QuestionnaireList />)

        expect(screen.getByTestId('mocked-header')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-hero')).toBeInTheDocument()
    })

    it('renders page components and list views', () => {
        render(<QuestionnaireList />)

        expect(
            screen.getByTestId('mocked-questionnaire-mobile-view')
        ).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-questionnaire-table')
        ).toBeInTheDocument()
    })
})
