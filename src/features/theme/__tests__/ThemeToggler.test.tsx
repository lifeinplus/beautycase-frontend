import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { mockDispatch } from '../../../app/__mocks__/hooks'
import { useAppSelector } from '../../../app/hooks'
import { ThemeToggler } from '../ThemeToggler'
import { toggleTheme } from '../themeSlice'

vi.mock('../../../app/hooks')

describe('ThemeToggler', () => {
    beforeEach(() => {
        document.documentElement.classList.toggle = vi.fn()
    })

    it('renders light mode button when darkMode is false', () => {
        vi.mocked(useAppSelector).mockReturnValue(false)

        render(<ThemeToggler />)

        expect(
            screen.getByRole('button', { name: /Light mode/i })
        ).toBeInTheDocument()

        expect(screen.getByTestId('mocked-sun-icon')).toBeInTheDocument()
        expect(screen.queryByTestId('mocked-moon-icon')).not.toBeInTheDocument()
    })

    it('renders dark mode button when darkMode is true', () => {
        vi.mocked(useAppSelector).mockReturnValue(true)

        render(<ThemeToggler />)

        expect(
            screen.getByRole('button', { name: /Dark mode/i })
        ).toBeInTheDocument()

        expect(screen.getByTestId('mocked-moon-icon')).toBeInTheDocument()
        expect(screen.queryByTestId('mocked-sun-icon')).not.toBeInTheDocument()
    })

    it('dispatches toggleTheme action when clicked', async () => {
        const user = userEvent.setup()
        vi.mocked(useAppSelector).mockReturnValue(false)

        render(<ThemeToggler />)

        const button = screen.getByRole('button')
        await user.click(button)

        expect(mockDispatch).toHaveBeenCalledWith(toggleTheme())
    })

    it('toggles the dark class on document element when clicked', async () => {
        const user = userEvent.setup()
        vi.mocked(useAppSelector).mockReturnValue(false)

        render(<ThemeToggler />)

        const button = screen.getByRole('button')
        await user.click(button)

        const toggle = document.documentElement.classList.toggle
        expect(toggle).toHaveBeenCalledWith('dark', true)
    })

    it('updates localStorage when clicked', async () => {
        const user = userEvent.setup()
        vi.mocked(useAppSelector).mockReturnValue(true)

        render(<ThemeToggler />)

        const button = screen.getByRole('button')
        await user.click(button)

        expect(localStorage.setItem).toHaveBeenCalledWith('darkMode', 'false')
    })

    it('has the correct accessibility attributes', () => {
        vi.mocked(useAppSelector).mockReturnValue(true)

        render(<ThemeToggler />)

        const button = screen.getByRole('button')
        expect(button).toHaveAttribute('aria-label', 'Dark mode')
        expect(button).toHaveClass('nav-btn')
        expect(button).toHaveClass('nav-btn-common')
    })
})
