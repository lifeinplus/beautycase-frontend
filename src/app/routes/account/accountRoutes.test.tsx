import { screen } from '@testing-library/dom'
import { describe, expect, it, vi } from 'vitest'

import App from '@/App'
import { renderWithRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/auth/components/persist-login/PersistLogin')
vi.mock('@/features/auth/components/require-auth/RequireAuth')
vi.mock('@/pages/account/Account')
vi.mock('@/app/layout/AppLayout')
vi.mock('@/shared/components/scroll-to-top/ScrollToTop')

describe('accountRoutes', () => {
    it('renders the account form correctly', () => {
        renderWithRouter(<App />, ['/account'])
        expect(screen.getByTestId('mocked-account')).toBeInTheDocument()
    })
})
