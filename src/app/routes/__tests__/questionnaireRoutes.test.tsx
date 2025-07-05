import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '../../../App'
import { renderWithRouter } from '../../../tests/mocks/wrappers'

vi.mock('../../hooks')
vi.mock('../../../shared/components/ScrollToTop')
vi.mock('../../../features/auth/components/PersistLogin')
vi.mock('../../../features/auth/components/RequireAuth')
vi.mock('../../../features/auth/components/RequireRole')
vi.mock('../../../features/questionnaires/pages/QuestionnaireListPage')
vi.mock('../../../features/questionnaires/pages/QuestionnaireResultPage')

describe('questionnaireRoutes', () => {
    it('renders the list page correctly', () => {
        renderWithRouter(<App />, ['/questionnaires'])

        expect(
            screen.getByTestId('mocked-questionnaire-list-page')
        ).toBeInTheDocument()
    })

    it('renders the result page correctly', () => {
        renderWithRouter(<App />, ['/questionnaires/1'])

        expect(
            screen.getByTestId('mocked-questionnaire-result-page')
        ).toBeInTheDocument()
    })
})
