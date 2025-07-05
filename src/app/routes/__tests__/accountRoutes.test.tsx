import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/features/account/pages/AccountPage')
vi.mock('@/features/auth/components/PersistLogin')
vi.mock('@/features/auth/components/RequireAuth')
vi.mock('../../../components/ScrollToTop')
vi.mock('../../hooks')

describe('accountRoutes', () => {
    it('renders the account form correctly', () => {
        renderWithRouter(<App />, ['/account'])
        expect(screen.getByTestId('mocked-account-page')).toBeInTheDocument()
    })
})
