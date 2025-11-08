import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'

import { mockMakeupBagQuestionnaires } from '@/features/questionnaires/api/__mocks__/questionnairesApi'
import {
    useGetAllMakeupBagQuestionnairesQuery,
    useGetMineMakeupBagQuestionnairesQuery,
} from '@/features/questionnaires/api/questionnairesApi'
import { mockNavigate } from '@/tests/mocks/router'
import { renderWithProviders } from '@/tests/mocks/wrappers'
import { MakeupBagQuestionnaireList } from './MakeupBagQuestionnaireList'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/questionnaires/api/questionnairesApi')
vi.mock(
    '@/features/questionnaires/makeup-bag/components/mobile-view/MakeupBagQuestionnaireMobileView'
)
vi.mock(
    '@/features/questionnaires/makeup-bag/components/table/MakeupBagQuestionnaireTable'
)

describe('MakeupBagQuestionnaireList', () => {
    beforeEach(() => {
        vi.mocked(
            useGetAllMakeupBagQuestionnairesQuery as Mock
        ).mockReturnValue({
            data: mockMakeupBagQuestionnaires,
            isLoading: false,
            error: null,
        })

        vi.mocked(
            useGetMineMakeupBagQuestionnairesQuery as Mock
        ).mockReturnValue({
            data: mockMakeupBagQuestionnaires,
            isLoading: false,
            error: null,
        })
    })

    it('renders the component with correct structure', () => {
        renderWithProviders(<MakeupBagQuestionnaireList />)

        expect(screen.getByRole('navigation')).toBeInTheDocument()
        expect(screen.getAllByText(/headlineList/)).toHaveLength(2)
        expect(screen.getAllByText(/makeupBag.hero.byline/)).toHaveLength(2)
    })

    it('renders page components and list views', () => {
        renderWithProviders(<MakeupBagQuestionnaireList />)

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

        await user.click(
            screen.getByRole('navigation').querySelector('button')!
        )

        expect(mockNavigate).toHaveBeenCalledWith('/questionnaires')
    })
})
