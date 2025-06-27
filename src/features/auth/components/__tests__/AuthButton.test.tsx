import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useAppSelector } from '../../../../app/hooks'
import { mockNavigate } from '../../../../tests/mocks/router'
import { useAuthLogout } from '../../hooks/useAuthLogout'
import { AuthButton } from '../AuthButton'

vi.mock('../../../../app/hooks')
vi.mock('../../hooks/useAuthLogout')

describe('AuthButton', () => {
    const mockHandleLogout = vi.fn()

    beforeEach(() => {
        vi.mocked(useAuthLogout).mockReturnValue(mockHandleLogout)
    })

    it('renders login button when user is not logged in', () => {
        vi.mocked(useAppSelector).mockReturnValue(null)

        render(<AuthButton />)

        expect(screen.getByRole('button')).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-arrow-right-end-on-rectangle-icon')
        ).toBeInTheDocument()
        expect(screen.getByText('login')).toBeInTheDocument()

        expect(
            screen.queryByTestId('mocked-arrow-left-start-on-rectangle-icon')
        ).not.toBeInTheDocument()
        expect(screen.queryByText('logout')).not.toBeInTheDocument()
    })

    it('renders logout button when user is logged in', () => {
        vi.mocked(useAppSelector).mockReturnValue('testuser')

        render(<AuthButton />)

        expect(screen.getByRole('button')).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-arrow-left-start-on-rectangle-icon')
        ).toBeInTheDocument()
        expect(screen.getByText('logout')).toBeInTheDocument()

        expect(
            screen.queryByTestId('arrow-right-end-on-rectangle-icon')
        ).not.toBeInTheDocument()
        expect(screen.queryByText('login')).not.toBeInTheDocument()
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

    it('applies correct button classes', () => {
        vi.mocked(useAppSelector).mockReturnValue(null)

        render(<AuthButton />)

        const button = screen.getByRole('button')
        expect(button).toHaveClass('nav-btn')
        expect(button).toHaveClass('nav-btn-common')
    })

    it('applies correct responsive classes to the text', () => {
        vi.mocked(useAppSelector).mockReturnValue(null)

        render(<AuthButton />)

        const textElement = screen.getByText('login')
        expect(textElement).toHaveClass('hidden')
        expect(textElement).toHaveClass('lg:inline')
    })
})
