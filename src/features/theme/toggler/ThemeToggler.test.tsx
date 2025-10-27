import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { mockDispatch } from '@/app/hooks/__mocks__/hooks'
import { useAppSelector } from '@/app/hooks/hooks'
import { toggleTheme } from '../slice/themeSlice'
import { ThemeToggler } from './ThemeToggler'

vi.mock('@/app/hooks/hooks')

describe('ThemeToggler', () => {
    beforeEach(() => {
        document.documentElement.classList.toggle = vi.fn()
    })

    it('renders light mode button when darkMode is false', () => {
        vi.mocked(useAppSelector).mockReturnValue(false)

        render(<ThemeToggler />)

        expect(
            screen.getByRole('button', { name: 'buttons.lightMode.ariaLabel' })
        ).toBeInTheDocument()
    })

    it('renders dark mode button when darkMode is true', () => {
        vi.mocked(useAppSelector).mockReturnValue(true)

        render(<ThemeToggler />)

        expect(
            screen.getByRole('button', { name: 'buttons.darkMode.ariaLabel' })
        ).toBeInTheDocument()
    })

    it('dispatches toggleTheme action when clicked', async () => {
        const user = userEvent.setup()
        vi.mocked(useAppSelector).mockReturnValue(false)

        render(<ThemeToggler />)
        await user.click(screen.getByRole('button'))

        expect(mockDispatch).toHaveBeenCalledWith(toggleTheme())
    })

    it('toggles the dark class on document element when clicked', async () => {
        const user = userEvent.setup()
        vi.mocked(useAppSelector).mockReturnValue(false)

        render(<ThemeToggler />)
        await user.click(screen.getByRole('button'))

        expect(document.documentElement.classList.toggle).toHaveBeenCalledWith(
            'dark',
            true
        )
    })

    it('updates localStorage when clicked', async () => {
        const user = userEvent.setup()
        vi.mocked(useAppSelector).mockReturnValue(true)

        render(<ThemeToggler />)
        await user.click(screen.getByRole('button'))

        expect(localStorage.setItem).toHaveBeenCalledWith('darkMode', 'false')
    })

    it('has the correct accessibility attributes', () => {
        vi.mocked(useAppSelector).mockReturnValue(true)

        render(<ThemeToggler />)

        expect(screen.getByRole('button')).toHaveAttribute(
            'aria-label',
            'buttons.darkMode.ariaLabel'
        )
    })
})
