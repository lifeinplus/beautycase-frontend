import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { mockDispatch } from '../../../tests'
import { ThemeToggler } from '../ThemeToggler'
import { toggleTheme } from '../themeSlice'

describe('ThemeToggler', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: vi.fn(),
                setItem: vi.fn(),
            },
            writable: true,
        })

        document.documentElement.classList.toggle = vi.fn()
        vi.mocked(useAppDispatch).mockReturnValue(mockDispatch)
    })

    it('renders light mode button when darkMode is false', () => {
        vi.mocked(useAppSelector).mockReturnValue(false)

        render(<ThemeToggler />)

        expect(
            screen.getByRole('button', { name: /Light mode/i })
        ).toBeInTheDocument()

        expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
        expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument()
    })

    it('renders dark mode button when darkMode is true', () => {
        vi.mocked(useAppSelector).mockReturnValue(true)

        render(<ThemeToggler />)

        expect(
            screen.getByRole('button', { name: /Dark mode/i })
        ).toBeInTheDocument()

        expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
        expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument()
    })

    it('dispatches toggleTheme action when clicked', () => {
        vi.mocked(useAppSelector).mockReturnValue(false)

        render(<ThemeToggler />)

        fireEvent.click(screen.getByRole('button'))

        expect(mockDispatch).toHaveBeenCalledWith(toggleTheme())
    })

    it('toggles the dark class on document element when clicked', () => {
        vi.mocked(useAppSelector).mockReturnValue(false)

        render(<ThemeToggler />)

        fireEvent.click(screen.getByRole('button'))

        const toggle = document.documentElement.classList.toggle
        expect(toggle).toHaveBeenCalledWith('dark', true)
    })

    it('updates localStorage when clicked', () => {
        vi.mocked(useAppSelector).mockReturnValue(true)

        render(<ThemeToggler />)

        fireEvent.click(screen.getByRole('button'))

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
