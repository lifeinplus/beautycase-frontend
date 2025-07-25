import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks')
vi.mock('@/features/auth/components/PersistLogin')
vi.mock('@/features/auth/components/RequireAuth')
vi.mock('@/features/auth/components/RequireRole')
vi.mock('@/pages/questionnaires/list/QuestionnaireList')
vi.mock('@/pages/questionnaires/result/QuestionnaireResult')
vi.mock('@/shared/components/layout/Layout')

describe('questionnaireRoutes', () => {
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
