import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'

import { mockQuestionnaires } from '@/features/questionnaires/api/__mocks__/questionnairesApi'
import { useGetAllMakeupBagQuestionnairesQuery } from '@/features/questionnaires/api/questionnairesApi'
import { TrainingList } from './TrainingList'

vi.mock('@/features/questionnaires/api/questionnairesApi')
vi.mock(
    '@/features/questionnaires/components/mobile-view/QuestionnaireMobileView'
)
vi.mock('@/features/questionnaires/components/table/QuestionnaireTable')
vi.mock('@/shared/components/common/hero/Hero')
vi.mock('@/shared/components/layout/header/Header')

describe('TrainingList', () => {
    beforeEach(() => {
        vi.mocked(
            useGetAllMakeupBagQuestionnairesQuery as Mock
        ).mockReturnValue({
            data: mockQuestionnaires,
            isLoading: false,
            error: null,
        })
    })

    it('renders the component with correct structure', () => {
        render(<TrainingList />)

        expect(screen.getByTestId('mocked-header')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-hero')).toBeInTheDocument()
    })

    it('renders page components and list views', () => {
        render(<TrainingList />)

        expect(
            screen.getByTestId('mocked-questionnaire-mobile-view')
        ).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-questionnaire-table')
        ).toBeInTheDocument()
    })
})
