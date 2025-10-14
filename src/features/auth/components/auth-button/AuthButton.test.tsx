import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useAppSelector } from '@/app/hooks/hooks'
import { mockNavigate } from '@/tests/mocks/router'
import { useAuthLogout } from '../../hooks/auth-logout/useAuthLogout'
import { AuthButton } from './AuthButton'

vi.mock('@/app/hooks/hooks')
vi.mock('../../hooks/auth-logout/useAuthLogout')

describe('AuthButton', () => {
    const mockHandleLogout = vi.fn()

    beforeEach(() => {
        vi.mocked(useAuthLogout).mockReturnValue(mockHandleLogout)
    })

    it('renders login button when user is not logged in', () => {
        vi.mocked(useAppSelector).mockReturnValue(null)

        render(<AuthButton />)

        const button = screen.getByRole('button')
        expect(button.querySelector('svg')).toBeInTheDocument()
        expect(button.textContent).toContain('login')
        expect(button.textContent).not.toContain('logout')
    })

    it('renders logout button when user is logged in', () => {
        vi.mocked(useAppSelector).mockReturnValue('testuser')

        render(<AuthButton />)

        const button = screen.getByRole('button')
        expect(button.querySelector('svg')).toBeInTheDocument()
        expect(button.textContent).toContain('logout')
        expect(button.textContent).not.toContain('login')
    })

    it('navigates to login page when login button is clicked', async () => {
        const user = userEvent.setup()
        vi.mocked(useAppSelector).mockReturnValue(null)

        render(<AuthButton />)
        await user.click(screen.getByRole('button'))

        expect(mockNavigate).toHaveBeenCalledWith('/login')
    })

    it('calls logout function when logout button is clicked', async () => {
        const user = userEvent.setup()
        vi.mocked(useAppSelector).mockReturnValue('testuser')

        render(<AuthButton />)
        await user.click(screen.getByRole('button'))

        expect(mockHandleLogout).toHaveBeenCalledTimes(1)
    })

    it('applies correct responsive classes to the text', () => {
        vi.mocked(useAppSelector).mockReturnValue(null)

        render(<AuthButton />)

        const textElement = screen.getByText('login')
        expect(textElement).toHaveClass('hidden')
        expect(textElement).toHaveClass('lg:inline')
    })
})
