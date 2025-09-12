import { screen } from '@testing-library/react'
import { Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useAppSelector } from '@/app/hooks/hooks'
import { useRefreshAuth } from '@/features/auth/hooks/refresh-auth/useRefreshAuth'
import { renderWithRouter } from '@/tests/mocks/wrappers'
import { PersistLogin } from './PersistLogin'

vi.mock('@/app/hooks/hooks')
vi.mock('@/app/config/config')
vi.mock('@/features/auth/hooks/refresh-auth/useRefreshAuth')
vi.mock('@/shared/components/common/spinner/Spinner')

const MockRoutes = () => (
    <Routes>
        <Route element={<PersistLogin />}>
            <Route
                path="/"
                element={<div data-testid="mocked-content">Content</div>}
            />
        </Route>
    </Routes>
)

describe('PersistLogin', () => {
    const mockRefreshAuth = vi.fn()

    beforeEach(() => {
        vi.mocked(useRefreshAuth).mockReturnValue(mockRefreshAuth)
        mockRefreshAuth.mockReturnValue(new Promise(() => {}))
    })

    it('renders Spinner while authentication is being refreshed', () => {
        renderWithRouter(<MockRoutes />)

        const spinner = screen.getByTestId('mocked-spinner')
        expect(spinner).toBeInTheDocument()

        expect(mockRefreshAuth).toHaveBeenCalledTimes(1)
    })

    it('renders Outlet when access token is present', () => {
        vi.mocked(useAppSelector).mockReturnValue('token1')

        renderWithRouter(<MockRoutes />)

        const content = screen.getByTestId('mocked-content')
        expect(content).toBeInTheDocument()

        const spinner = screen.queryByTestId('mocked-spinner')
        expect(spinner).not.toBeInTheDocument()

        expect(mockRefreshAuth).not.toHaveBeenCalled()
    })
})
