import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('../../hooks')
vi.mock('@/shared/components/ScrollToTop')
vi.mock('@/features/auth/components/PersistLogin')
vi.mock('@/features/auth/components/RequireAuth')
vi.mock('@/features/auth/components/RequireRole')
vi.mock('@/features/brands/pages/BrandsPage')
vi.mock('@/features/referenceLists/pages/ReferenceListsPage')
vi.mock('@/features/stores/pages/StoresPage')

describe('referenceListRoutes', () => {
    it('renders the list page correctly', () => {
        renderWithRouter(<App />, ['/reference_lists'])

        expect(
            screen.getByTestId('mocked-reference-lists-page')
        ).toBeInTheDocument()
    })

    it('renders the brands page correctly', () => {
        renderWithRouter(<App />, ['/reference_lists/brands'])

        expect(screen.getByTestId('mocked-brands-page')).toBeInTheDocument()
    })

    it('renders the stores page correctly', () => {
        renderWithRouter(<App />, ['/reference_lists/stores'])

        expect(screen.getByTestId('mocked-stores-page')).toBeInTheDocument()
    })
})
