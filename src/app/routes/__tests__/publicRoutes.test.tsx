import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks')
vi.mock('@/features/auth/components/PersistLogin')
vi.mock('@/features/auth/components/RequireAuth')
vi.mock('@/features/auth/components/RequireRole')
vi.mock('@/features/questionnaires/pages/ConfirmationPage')
vi.mock('@/features/questionnaires/pages/QuestionnairePage')
vi.mock('@/pages/auth/LoginPage')
vi.mock('@/pages/auth/RegisterPage')
vi.mock('@/pages/auth/UnauthorizedPage')
vi.mock('@/pages/home/HomePage')
vi.mock('@/shared/components/ScrollToTop')

describe('publicRoutes', () => {
    it('renders the home page correctly', () => {
        renderWithRouter(<App />, ['/'])

        expect(screen.getByTestId('mocked-home-page')).toBeInTheDocument()
    })

    it('renders the confirmation page correctly', () => {
        renderWithRouter(<App />, ['/confirmation'])

        expect(
            screen.getByTestId('mocked-confirmation-page')
        ).toBeInTheDocument()
    })

    it('renders the login page correctly', () => {
        renderWithRouter(<App />, ['/login'])

        expect(screen.getByTestId('mocked-login-page')).toBeInTheDocument()
    })

    it('renders the register page correctly', () => {
        renderWithRouter(<App />, ['/register'])

        expect(screen.getByTestId('mocked-register-page')).toBeInTheDocument()
    })

    it('renders the questionnaire page correctly', () => {
        renderWithRouter(<App />, ['/questionnaire'])

        expect(
            screen.getByTestId('mocked-questionnaire-page')
        ).toBeInTheDocument()
    })

    it('renders the unauthorized page correctly', () => {
        renderWithRouter(<App />, ['/unauthorized'])

        expect(
            screen.getByTestId('mocked-unauthorized-page')
        ).toBeInTheDocument()
    })
})
