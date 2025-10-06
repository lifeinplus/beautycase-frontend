import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'

import { mockMakeupBagQuestionnaires } from '@/features/questionnaires/api/__mocks__/questionnairesApi'
import { useGetAllMakeupBagQuestionnairesQuery } from '@/features/questionnaires/api/questionnairesApi'
import { mockNavigate } from '@/tests/mocks/router'
import userEvent from '@testing-library/user-event'
import { MakeupBagQuestionnaireList } from './MakeupBagQuestionnaireList'

vi.mock('@/features/questionnaires/api/questionnairesApi')
vi.mock(
    '@/features/questionnaires/makeup-bag/components/mobile-view/MakeupBagQuestionnaireMobileView'
)
vi.mock(
    '@/features/questionnaires/makeup-bag/components/table/MakeupBagQuestionnaireTable'
)
vi.mock('@/shared/components/common/hero/Hero')
vi.mock('@/shared/components/layout/top-panel/TopPanel')

describe('MakeupBagQuestionnaireList', () => {
    beforeEach(() => {
        vi.mocked(
            useGetAllMakeupBagQuestionnairesQuery as Mock
        ).mockReturnValue({
            data: mockMakeupBagQuestionnaires,
            isLoading: false,
            error: null,
        })
    })

    it('renders the component with correct structure', () => {
        render(<MakeupBagQuestionnaireList />)

        expect(screen.getByTestId('mocked-top-panel')).toBeInTheDocument()
        expect(screen.getAllByTestId('mocked-hero')).toHaveLength(2)
    })

    it('renders page components and list views', () => {
        render(<MakeupBagQuestionnaireList />)

        expect(
            screen.getByTestId('mocked-makeup-bag-questionnaire-mobile-view')
        ).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-makeup-bag-questionnaire-table')
        ).toBeInTheDocument()
    })

    it('calls navigate when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<MakeupBagQuestionnaireList />)
        await user.click(screen.getByTestId('mocked-back-button'))

        expect(mockNavigate).toHaveBeenCalledWith('/questionnaires')
    })
})
