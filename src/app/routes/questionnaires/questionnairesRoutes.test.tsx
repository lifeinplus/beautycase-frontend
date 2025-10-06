import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks/hooks')
vi.mock('@/app/layout/AppLayout')
vi.mock('@/features/auth/components/persist-login/PersistLogin')
vi.mock('@/features/auth/components/require-auth/RequireAuth')
vi.mock('@/features/auth/components/require-role/RequireRole')
vi.mock('@/pages/questionnaires/makeup-bag/list/MakeupBagQuestionnaireList')
vi.mock('@/pages/questionnaires/makeup-bag/result/MakeupBagQuestionnaireResult')
vi.mock('@/pages/questionnaires/training/list/TrainingQuestionnaireList')
vi.mock('@/pages/questionnaires/training/result/TrainingQuestionnaireResult')

describe('questionnairesRoutes', () => {
    describe('makeup-bag', () => {
        it('renders the list page correctly', () => {
            renderWithRouter(<App />, ['/questionnaires/makeup-bags'])

            expect(
                screen.getByTestId('mocked-makeup-bag-questionnaire-list')
            ).toBeInTheDocument()
        })

        it('renders the result page correctly', () => {
            renderWithRouter(<App />, ['/questionnaires/makeup-bags/123'])

            expect(
                screen.getByTestId('mocked-makeup-bag-questionnaire-result')
            ).toBeInTheDocument()
        })
    })

    describe('trainings', () => {
        it('renders the list page correctly', () => {
            renderWithRouter(<App />, ['/questionnaires/trainings'])

            expect(
                screen.getByTestId('mocked-training-questionnaire-list')
            ).toBeInTheDocument()
        })

        it('renders the result page correctly', () => {
            renderWithRouter(<App />, ['/questionnaires/trainings/123'])

            expect(
                screen.getByTestId('mocked-training-questionnaire-result')
            ).toBeInTheDocument()
        })
    })
})
