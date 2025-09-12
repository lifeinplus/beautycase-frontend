import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/auth/components/persist-login/PersistLogin')
vi.mock('@/features/auth/components/require-auth/RequireAuth')
vi.mock('@/features/auth/components/require-role/RequireRole')
vi.mock('@/pages/questionnaires/list/QuestionnaireList')
vi.mock('@/pages/questionnaires/result/QuestionnaireResult')
vi.mock('@/app/layout/AppLayout')

describe('questionnairesRoutes', () => {
    it('renders the list page correctly', () => {
        renderWithRouter(<App />, ['/questionnaires'])

        expect(
            screen.getByTestId('mocked-questionnaire-list')
        ).toBeInTheDocument()
    })

    it('renders the result page correctly', () => {
        renderWithRouter(<App />, ['/questionnaires/123'])

        expect(
            screen.getByTestId('mocked-questionnaire-result')
        ).toBeInTheDocument()
    })
})
