import { screen } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'

import { useAppSelector } from '../../../../app/hooks'
import { renderWithRouter } from '../../../../tests/mocks/wrappers'
import { RequireAuth } from '../RequireAuth'

vi.mock('../../../../app/hooks')

const MockProtected = () => (
    <div data-testid="mocked-protected-content">ProtectedContent</div>
)

const MockLogin = () => <div data-testid="mocked-login-page">LoginPage</div>

const MockRoutes = () => (
    <Routes>
        <Route path="/" element={<RequireAuth />}>
            <Route path="protected" element={<MockProtected />} />
        </Route>
        <Route path="/login" element={<MockLogin />} />
    </Routes>
)

describe('RequireAuth', () => {
    const initialEntries = ['/protected']

    it('renders Outlet if user is authenticated', () => {
        vi.mocked(useAppSelector).mockReturnValue('admin')

        renderWithRouter(<MockRoutes />, initialEntries)

        const content = screen.getByTestId('mocked-protected-content')
        expect(content).toBeInTheDocument()
    })

    it('redirects to login if user is not authenticated', () => {
        vi.mocked(useAppSelector).mockReturnValue(null)

        renderWithRouter(<MockRoutes />, initialEntries)

        const page = screen.getByTestId('mocked-login-page')
        expect(page).toBeInTheDocument()
    })
})
