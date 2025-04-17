import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAppSelector } from '../../../../app/hooks'
import { useRefreshAuth } from '../../../../hooks/useRefreshAuth'
import { PersistLogin } from '../PersistLogin'

vi.mock('../../../../hooks/useRefreshAuth', () => ({
    useRefreshAuth: vi.fn(),
}))

vi.mock('../../../../components/Spinner', () => ({
    Spinner: () => <div data-testid="mocked-spinner">Loading...</div>,
}))

describe('PersistLogin', () => {
    const mockRefreshAuth = vi.fn()

    beforeEach(() => {
        vi.mocked(useRefreshAuth).mockReturnValue(mockRefreshAuth)
    })

    it('renders Spinner while authentication is being refreshed', () => {
        vi.mocked(useAppSelector).mockReturnValue(null)
        mockRefreshAuth.mockReturnValue(new Promise(() => {}))

        render(<PersistLogin />)

        expect(screen.getByTestId('mocked-spinner')).toBeInTheDocument()
    })
})
