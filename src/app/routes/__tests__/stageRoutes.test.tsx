import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks')
vi.mock('@/features/auth/components/PersistLogin')
vi.mock('@/features/auth/components/RequireAuth')
vi.mock('@/features/auth/components/RequireRole')
vi.mock('@/features/products/wrappers/ProductSelectionForStage')
vi.mock('@/pages/stages/add/StageAdd')
vi.mock('@/pages/stages/details/StageDetails')
vi.mock('@/pages/stages/edit/StageEdit')
vi.mock('@/pages/stages/list/StageList')
vi.mock('@/shared/components/layout/Layout')

describe('stageRoutes', () => {
    it('renders the list page correctly', () => {
        renderWithRouter(<App />, ['/stages'])

        expect(screen.getByTestId('mocked-stage-list')).toBeInTheDocument()
    })

    it('renders the details page correctly', () => {
        renderWithRouter(<App />, ['/stages/1'])

        expect(screen.getByTestId('mocked-stage-details')).toBeInTheDocument()
    })

    it('renders the product selection page correctly', () => {
        renderWithRouter(<App />, ['/stages/1/products'])

        expect(
            screen.getByTestId('mocked-product-selection-for-stage')
        ).toBeInTheDocument()
    })

    it('renders the add page correctly', () => {
        renderWithRouter(<App />, ['/stages/add'])

        expect(screen.getByTestId('mocked-stage-add')).toBeInTheDocument()
    })

    it('renders the edit page correctly', () => {
        renderWithRouter(<App />, ['/stages/edit/1'])

        expect(screen.getByTestId('mocked-stage-edit')).toBeInTheDocument()
    })
})
