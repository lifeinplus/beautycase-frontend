import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/auth/components/persist-login/PersistLogin')
vi.mock('@/pages/auth/login/Login')
vi.mock('@/pages/auth/register/Register')
vi.mock('@/pages/auth/unauthorized/Unauthorized')
vi.mock('@/pages/home/Home')
vi.mock('@/pages/pricing/ui/Pricing')
vi.mock('@/pages/questionnaires/confirmation/Confirmation')
vi.mock('@/pages/questionnaires/create/QuestionnaireCreate')
vi.mock('@/app/layout/AppLayout')

describe('publicRoutes', () => {
    it('renders the home page correctly', () => {
        renderWithRouter(<App />, ['/'])
        expect(screen.getByTestId('mocked-home')).toBeInTheDocument()
    })

    it('renders the login page correctly', () => {
        renderWithRouter(<App />, ['/login'])
        expect(screen.getByTestId('mocked-login')).toBeInTheDocument()
    })

    it('renders the register page correctly', () => {
        renderWithRouter(<App />, ['/register'])
        expect(screen.getByTestId('mocked-register')).toBeInTheDocument()
    })

    it('renders the confirmation page correctly', () => {
        renderWithRouter(<App />, ['/confirmation'])
        expect(screen.getByTestId('mocked-confirmation')).toBeInTheDocument()
    })

    it('renders the pricing page correctly', () => {
        renderWithRouter(<App />, ['/pricing'])
        expect(screen.getByTestId('mocked-pricing')).toBeInTheDocument()
    })

    it('renders the questionnaire page correctly', () => {
        renderWithRouter(<App />, ['/questionnaire'])
        expect(screen.getByTestId('mocked-questionnaire')).toBeInTheDocument()
    })

    it('renders the unauthorized page correctly', () => {
        renderWithRouter(<App />, ['/unauthorized'])
        expect(screen.getByTestId('mocked-unauthorized')).toBeInTheDocument()
    })
})
