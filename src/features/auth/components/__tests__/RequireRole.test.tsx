import { screen } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'

import { useAppSelector } from '../../../../app/hooks'
import { renderWithRouter } from '../../../../tests/mocks/wrappers'

import { RequireRole } from '../RequireRole'

const MockProtected = () => (
    <div data-testid="protected-content">Protected Content</div>
)

const MockUnauthorized = () => (
    <div data-testid="unauthorized-page">Unauthorized</div>
)

const MockRoutes = () => (
    <Routes>
        <Route
            path="/"
            element={<RequireRole allowedRoles={['admin', 'mua']} />}
        >
            <Route path="protected" element={<MockProtected />} />
        </Route>
        <Route path="/unauthorized" element={<MockUnauthorized />} />
    </Routes>
)

describe('RequireRole', () => {
    const initialEntries = ['/protected']

    it('renders Outlet if user has an allowed role', () => {
        vi.mocked(useAppSelector).mockReturnValue('admin')

        renderWithRouter(<MockRoutes />, initialEntries)

        expect(screen.getByTestId('protected-content')).toBeInTheDocument()
    })

    it('redirects to unauthorized page when user role is not allowed', () => {
        vi.mocked(useAppSelector).mockReturnValue('client')

        renderWithRouter(<MockRoutes />, initialEntries)

        expect(screen.getByTestId('unauthorized-page')).toBeInTheDocument()
    })

    it('redirects to unauthorized page if user has no role', () => {
        vi.mocked(useAppSelector).mockReturnValue(null)

        renderWithRouter(<MockRoutes />, initialEntries)

        expect(screen.getByTestId('unauthorized-page')).toBeInTheDocument()
    })
})
