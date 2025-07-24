import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks')
vi.mock('@/features/auth/components/PersistLogin')
vi.mock('@/pages/auth/login/Login')
vi.mock('@/pages/auth/register/Register')
vi.mock('@/pages/auth/unauthorized/Unauthorized')
vi.mock('@/pages/home/Home')
vi.mock('@/pages/questionnaire/ConfirmationPage')
vi.mock('@/pages/questionnaire/QuestionnairePage')
vi.mock('@/shared/components/layout/Layout')

describe('publicRoutes', () => {
    it('renders the home page correctly', () => {
        renderWithRouter(<App />, ['/'])
        expect(screen.getByTestId('mocked-home')).toBeInTheDocument()
    })

    it('renders the confirmation page correctly', () => {
        renderWithRouter(<App />, ['/confirmation'])

        expect(
            screen.getByTestId('mocked-confirmation-page')
        ).toBeInTheDocument()
    })

    it('renders the login page correctly', () => {
        renderWithRouter(<App />, ['/login'])
        expect(screen.getByTestId('mocked-login')).toBeInTheDocument()
    })

    it('renders the register page correctly', () => {
        renderWithRouter(<App />, ['/register'])
        expect(screen.getByTestId('mocked-register')).toBeInTheDocument()
    })

    it('renders the questionnaire page correctly', () => {
        renderWithRouter(<App />, ['/questionnaire'])

        expect(
            screen.getByTestId('mocked-questionnaire-page')
        ).toBeInTheDocument()
    })

    it('renders the unauthorized page correctly', () => {
        renderWithRouter(<App />, ['/unauthorized'])
        expect(screen.getByTestId('mocked-unauthorized')).toBeInTheDocument()
    })
})
