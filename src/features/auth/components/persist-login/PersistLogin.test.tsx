import { screen, waitFor } from '@testing-library/react'
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
vi.mock('@/shared/components/common/startup-progress/StartupProgress')

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

        expect(screen.getByTestId('mocked-spinner')).toBeInTheDocument()
        expect(mockRefreshAuth).toHaveBeenCalledTimes(1)
    })

    it('renders Outlet when access token is present', () => {
        vi.mocked(useAppSelector).mockReturnValue('token1')

        renderWithRouter(<MockRoutes />)

        expect(screen.getByTestId('mocked-content')).toBeInTheDocument()

        expect(screen.queryByTestId('mocked-spinner')).not.toBeInTheDocument()
        expect(mockRefreshAuth).not.toHaveBeenCalled()
    })

    it('hides Spinner after successful refresh when no access token', async () => {
        vi.mocked(useAppSelector).mockReturnValue(undefined)
        mockRefreshAuth.mockResolvedValueOnce('ok')

        renderWithRouter(<MockRoutes />)

        expect(await screen.findByTestId('mocked-content')).toBeInTheDocument()
        expect(screen.queryByTestId('mocked-spinner')).not.toBeInTheDocument()
        expect(mockRefreshAuth).toHaveBeenCalledTimes(1)
    })

    it('renders StartupProgress after 1s of loading', async () => {
        vi.mocked(useAppSelector).mockReturnValue(undefined)

        renderWithRouter(<MockRoutes />)

        expect(screen.getByTestId('mocked-spinner')).toBeInTheDocument()

        await waitFor(
            () => {
                expect(
                    screen.getByTestId('mocked-startup-progress')
                ).toBeInTheDocument()
            },
            { timeout: 1500 }
        )
    })

    it('logs error when refreshAuth fails', async () => {
        vi.mocked(useAppSelector).mockReturnValue(undefined)
        const consoleErrorSpy = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})
        mockRefreshAuth.mockRejectedValueOnce(new Error('refresh failed'))

        renderWithRouter(<MockRoutes />)

        expect(await screen.findByTestId('mocked-content')).toBeInTheDocument()
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Refresh auth failed',
            expect.any(Error)
        )

        consoleErrorSpy.mockRestore()
    })
})
