import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useLocation } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useAppSelector } from '@/app/hooks'
import { selectRole, selectUsername } from '@/features/auth/authSlice'
import { mockLocation, mockNavigate } from '@/tests/mocks/router'
import { renderWithProviders } from '@/tests/mocks/wrappers'
import { NavBar } from '@/shared/components/navigation/NavBar'

vi.mock('@/app/hooks')
vi.mock('@/features/auth/components/AuthButton')
vi.mock('@/features/theme/ThemeToggler')
vi.mock('../../common/AppInfo')
vi.mock('../../ui/LanguageSwitcher')
vi.mock('../../ui/LogoLink')
vi.mock('../NavButton')

describe('NavBar', () => {
    beforeEach(() => {
        vi.mocked(useAppSelector).mockImplementation((selector) => {
            if (selector === selectRole) return 'mua'
            if (selector === selectUsername) return 'testuser'
            return null
        })

        vi.mocked(useLocation).mockReturnValue({
            ...mockLocation,
            pathname: '/questionnaires',
        })
    })

    it('renders the brand logo with responsive behavior', () => {
        renderWithProviders(<NavBar />)

        expect(screen.getByText('B')).toBeInTheDocument()
        expect(screen.getByText('Beautycase')).toBeInTheDocument()
    })

    it('renders navigation buttons for accessible menu items', () => {
        renderWithProviders(<NavBar />)

        const buttons = [
            'menu.questionnaire',
            'menu.makeupBags',
            'menu.account',
        ]

        buttons.forEach((b) =>
            expect(screen.getByRole('button', { name: b })).toBeInTheDocument()
        )

        expect(
            screen.queryByRole('button', { name: /referenceLists/i })
        ).not.toBeInTheDocument()
    })

    it('renders ThemeToggler and AuthButton', () => {
        renderWithProviders(<NavBar />)

        expect(screen.getByTestId('mocked-auth-button')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-theme-toggler')).toBeInTheDocument()
    })

    it('calls navigate when a menu item is clicked', async () => {
        const user = userEvent.setup()

        renderWithProviders(<NavBar />)

        await user.click(screen.getByRole('button', { name: /stages/i }))
        await user.click(screen.getByRole('button', { name: /lessons/i }))

        expect(mockNavigate).toHaveBeenCalledTimes(2)
    })

    it('applies active class to current path navigation button', () => {
        renderWithProviders(<NavBar />)

        expect(
            screen.getByRole('button', { name: /questionnaires/i })
        ).toHaveClass('text-danger')

        expect(
            screen.getByRole('button', { name: /makeupBags/i })
        ).not.toHaveClass('text-danger')
    })

    it('navigates when clicking a navigation button', async () => {
        const user = userEvent.setup()

        renderWithProviders(<NavBar />)
        await user.click(screen.getByRole('button', { name: /makeupBags/i }))

        expect(mockNavigate).toHaveBeenCalledWith('/makeup_bags')
    })

    it('scrolls to top when clicking the active navigation button', async () => {
        const user = userEvent.setup()

        renderWithProviders(<NavBar />)

        await user.click(
            screen.getByRole('button', { name: /questionnaires/i })
        )

        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            behavior: 'smooth',
        })

        expect(mockNavigate).not.toHaveBeenCalled()
    })

    it('renders children content', () => {
        renderWithProviders(
            <NavBar>
                <button data-testid="mocked-child-button">Child Button</button>
            </NavBar>
        )

        expect(screen.getByTestId('mocked-child-button')).toBeInTheDocument()
    })
})
