import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('../../hooks')
vi.mock('@/shared/components/ScrollToTop')
vi.mock('@/features/auth/components/PersistLogin')
vi.mock('@/features/auth/components/RequireAuth')
vi.mock('@/features/auth/components/RequireRole')
vi.mock('@/features/products/pages/ProductSelectionPage')
vi.mock('@/features/stages/pages/StageAddPage')
vi.mock('@/features/stages/pages/StageDetailsPage')
vi.mock('@/features/stages/pages/StageEditPage')
vi.mock('@/features/stages/pages/StageListPage')

describe('stageRoutes', () => {
    it('renders the list page correctly', () => {
        renderWithRouter(<App />, ['/stages'])

        expect(screen.getByTestId('mocked-stage-list-page')).toBeInTheDocument()
    })

    it('renders the details page correctly', () => {
        renderWithRouter(<App />, ['/stages/1'])

        expect(
            screen.getByTestId('mocked-stage-details-page')
        ).toBeInTheDocument()
    })

    it('renders the add page correctly', () => {
        renderWithRouter(<App />, ['/stages/add'])

        expect(screen.getByTestId('mocked-stage-add-page')).toBeInTheDocument()
    })

    it('renders the edit page correctly', () => {
        renderWithRouter(<App />, ['/stages/edit/1'])

        expect(screen.getByTestId('mocked-stage-edit-page')).toBeInTheDocument()
    })

    it('renders the product selection page correctly', () => {
        renderWithRouter(<App />, ['/stages/edit/1/products'])

        expect(
            screen.getByTestId('mocked-product-selection-page')
        ).toBeInTheDocument()
    })
})
