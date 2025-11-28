import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { ROUTES } from '@/shared/config/routes'
import {
    renderWithProviderAndRouter,
    renderWithRouter,
} from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks/hooks')
vi.mock('@/app/layout/AppLayout')
vi.mock('@/features/auth/components/persist-login/PersistLogin')
vi.mock('@/pages/auth/login/Login')
vi.mock('@/pages/auth/register/Register')
vi.mock('@/pages/auth/unauthorized/Unauthorized')
vi.mock('@/pages/home/Home')
vi.mock('@/pages/pricing/ui/Pricing')
vi.mock('@/pages/questionnaires/confirmation/Confirmation')
vi.mock('@/pages/questionnaires/makeup-bag/create/MakeupBagQuestionnaireCreate')
vi.mock('@/pages/questionnaires/training/create/TrainingQuestionnaireCreate')
vi.mock('@/widgets/lesson/details/LessonDetails')
vi.mock('@/widgets/makeup-bag/details/MakeupBagDetails')
vi.mock('@/widgets/product/details/ProductDetails')
vi.mock('@/widgets/tool/details/ToolDetails')

describe('publicRoutes', () => {
    it('renders the home page correctly', () => {
        renderWithRouter(<App />, [ROUTES.home])
        expect(screen.getByTestId('mocked-home')).toBeInTheDocument()
    })

    it('renders the login page correctly', () => {
        renderWithRouter(<App />, [ROUTES.login])
        expect(screen.getByTestId('mocked-login')).toBeInTheDocument()
    })

    it('renders the register page correctly', () => {
        renderWithRouter(<App />, [ROUTES.register])
        expect(screen.getByTestId('mocked-register')).toBeInTheDocument()
    })

    it('renders the confirmation page correctly', () => {
        renderWithRouter(<App />, [ROUTES.confirmation])
        expect(screen.getByTestId('mocked-confirmation')).toBeInTheDocument()
    })

    it('renders the LessonDetailsViewMode page correctly', () => {
        renderWithProviderAndRouter(<App />, [ROUTES.lessons.details('123')])
        expect(screen.getByTestId('mocked-lesson-details')).toBeInTheDocument()
    })

    it('renders the MakeupBagDetailsViewMode page correctly', () => {
        renderWithProviderAndRouter(<App />, [ROUTES.makeupBags.details('123')])
        expect(
            screen.getByTestId('mocked-makeup-bag-details')
        ).toBeInTheDocument()
    })

    it('renders the ProductDetailsViewMode page correctly', () => {
        renderWithProviderAndRouter(<App />, [ROUTES.products.details('123')])
        expect(screen.getByTestId('mocked-product-details')).toBeInTheDocument()
    })

    it('renders the pricing page correctly', () => {
        renderWithRouter(<App />, [ROUTES.pricing])
        expect(screen.getByTestId('mocked-pricing')).toBeInTheDocument()
    })

    it('renders the makeup bag questionnaire page correctly', () => {
        renderWithRouter(<App />, [ROUTES.questionnaires.makeupBags.create])
        expect(
            screen.getByTestId('mocked-makeup-bag-questionnaire-create')
        ).toBeInTheDocument()
    })

    it('renders the training questionnaire page correctly', () => {
        renderWithRouter(<App />, [ROUTES.questionnaires.trainings.create])
        expect(
            screen.getByTestId('mocked-training-questionnaire-create')
        ).toBeInTheDocument()
    })

    it('renders the unauthorized page correctly', () => {
        renderWithRouter(<App />, [ROUTES.unauthorized])
        expect(screen.getByTestId('mocked-unauthorized')).toBeInTheDocument()
    })
})
