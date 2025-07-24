import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks')
vi.mock('@/features/auth/components/PersistLogin')
vi.mock('@/features/auth/components/RequireAuth')
vi.mock('@/pages/account/Account')
vi.mock('@/shared/components/layout/Layout')
vi.mock('@/shared/components/ScrollToTop')

describe('accountRoutes', () => {
    it('renders the account form correctly', () => {
        renderWithRouter(<App />, ['/account'])
        expect(screen.getByTestId('mocked-account')).toBeInTheDocument()
    })
})
