import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks/hooks')
vi.mock('@/app/layout/AppLayout')
vi.mock('@/features/auth/components/persist-login/PersistLogin')
vi.mock('@/features/auth/components/require-auth/RequireAuth')
vi.mock('@/features/auth/components/require-role/RequireRole')
vi.mock('@/pages/brands/Brands')
vi.mock('@/pages/reference-lists/ReferenceLists')
vi.mock('@/pages/stores/Stores')

describe('referenceListsRoutes', () => {
    it('renders the list page correctly', () => {
        renderWithRouter(<App />, ['/reference-lists'])
        expect(screen.getByTestId('mocked-reference-lists')).toBeInTheDocument()
    })

    it('renders the brands page correctly', () => {
        renderWithRouter(<App />, ['/reference-lists/brands'])
        expect(screen.getByTestId('mocked-brands')).toBeInTheDocument()
    })

    it('renders the stores page correctly', () => {
        renderWithRouter(<App />, ['/reference-lists/stores'])
        expect(screen.getByTestId('mocked-stores')).toBeInTheDocument()
    })
})
