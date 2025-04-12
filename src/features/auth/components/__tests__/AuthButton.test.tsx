import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useAppSelector } from '../../../../app/hooks'
import { mockHandleLogout } from '../../../../tests/mocks/auth'
import { mockNavigate } from '../../../../tests/mocks/router'
import { useAuthLogout } from '../../hooks/useAuthLogout'
import { AuthButton } from '../AuthButton'

vi.mock('../../hooks/useAuthLogout', () => ({
    useAuthLogout: vi.fn(),
}))

describe('AuthButton', () => {
    beforeEach(() => {
        vi.mocked(useAuthLogout).mockReturnValue(mockHandleLogout)
    })

    it('renders login button when user is not logged in', () => {
        vi.mocked(useAppSelector).mockReturnValue(null)

        render(<AuthButton />)

        expect(screen.getByRole('button')).toBeInTheDocument()

        expect(
            screen.getByTestId('arrow-right-end-on-rectangle-icon')
        ).toBeInTheDocument()
        expect(screen.getByText('Войти')).toBeInTheDocument()

        expect(
            screen.queryByTestId('arrow-left-start-on-rectangle-icon')
        ).not.toBeInTheDocument()
        expect(screen.queryByText('Выйти')).not.toBeInTheDocument()
    })

    it('renders logout button when user is logged in', () => {
        vi.mocked(useAppSelector).mockReturnValue('testuser')

        render(<AuthButton />)

        expect(screen.getByRole('button')).toBeInTheDocument()

        expect(
            screen.getByTestId('arrow-left-start-on-rectangle-icon')
        ).toBeInTheDocument()
        expect(screen.getByText('Выйти')).toBeInTheDocument()

        expect(
            screen.queryByTestId('arrow-right-end-on-rectangle-icon')
        ).not.toBeInTheDocument()
        expect(screen.queryByText('Войти')).not.toBeInTheDocument()
    })

    it('navigates to login page when login button is clicked', async () => {
        const user = userEvent.setup()
        vi.mocked(useAppSelector).mockReturnValue(null)

        render(<AuthButton />)

        const button = screen.getByRole('button')
        await user.click(button)

        expect(mockNavigate).toHaveBeenCalledWith('/login')
    })

    it('calls logout function when logout button is clicked', async () => {
        const user = userEvent.setup()
        vi.mocked(useAppSelector).mockReturnValue('testuser')

        render(<AuthButton />)

        const button = screen.getByRole('button')
        await user.click(button)

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

        const textElement = screen.getByText('Войти')
        expect(textElement).toHaveClass('hidden')
        expect(textElement).toHaveClass('lg:inline')
    })
})
