import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { ROUTES } from '@/shared/config/routes'
import { renderWithProviderAndRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks/hooks')
vi.mock('@/app/layout/AppLayout')
vi.mock('@/features/auth/components/persist-login/PersistLogin')
vi.mock('@/features/auth/components/require-auth/RequireAuth')
vi.mock('@/features/auth/components/require-role/RequireRole')
vi.mock('@/widgets/lesson/details/LessonDetails')
vi.mock('@/widgets/makeup-bag/details/MakeupBagDetails')
vi.mock('@/widgets/product/details/ProductDetails')
vi.mock('@/widgets/tool/details/ToolDetails')

describe('backstageRoutes', () => {
    it('renders the LessonDetailsBackstage page correctly', () => {
        renderWithProviderAndRouter(<App />, [
            ROUTES.backstage.lessons.details('123'),
        ])
        expect(screen.getByTestId('mocked-lesson-details')).toBeInTheDocument()
    })

    it('renders the MakeupBagDetailsBackstage page correctly', () => {
        renderWithProviderAndRouter(<App />, [
            ROUTES.backstage.makeupBags.details('123'),
        ])
        expect(
            screen.getByTestId('mocked-makeup-bag-details')
        ).toBeInTheDocument()
    })

    it('renders the ProductDetailsBackstage page correctly', () => {
        renderWithProviderAndRouter(<App />, [
            ROUTES.backstage.products.details('123'),
        ])
        expect(screen.getByTestId('mocked-product-details')).toBeInTheDocument()
    })
})
