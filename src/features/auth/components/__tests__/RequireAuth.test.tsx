import { screen } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'

import { useAppSelector } from '../../../../app/hooks'
import { renderWithRouter } from '../../../../tests/mocks/wrappers'

import { RequireAuth } from '../RequireAuth'

const MockProtected = () => (
    <div data-testid="protected-content">Protected Content</div>
)

const MockLogin = () => <div data-testid="login-page">Login Page</div>

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

        expect(screen.getByTestId('protected-content')).toBeInTheDocument()
    })

    it('redirects to login if user is not authenticated', () => {
        vi.mocked(useAppSelector).mockReturnValue(null)

        renderWithRouter(<MockRoutes />, initialEntries)

        expect(screen.getByTestId('login-page')).toBeInTheDocument()
    })
})
