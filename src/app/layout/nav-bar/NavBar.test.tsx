import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useLocation } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useAppSelector } from '@/app/hooks/hooks'
import { NavBar } from '@/app/layout/nav-bar/NavBar'
import { selectRole, selectUsername } from '@/features/auth/slice/authSlice'
import { mockLocation, mockNavigate } from '@/tests/mocks/router'
import { renderWithProviderAndRouter } from '@/tests/mocks/wrappers'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/auth/components/auth-button/AuthButton')
vi.mock('@/features/theme/toggler/ThemeToggler')

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
        renderWithProviderAndRouter(<NavBar />)

        expect(screen.getByText('B')).toBeInTheDocument()
        expect(screen.getAllByText('Beautycase')).toHaveLength(2)
    })

    it('renders navigation buttons for accessible menu items', () => {
        renderWithProviderAndRouter(<NavBar />)

        const buttons = ['menu.questionnaires', 'menu.pricing', 'menu.account']

        buttons.forEach((b) =>
            expect(screen.getByRole('button', { name: b })).toBeInTheDocument()
        )

        expect(
            screen.queryByRole('button', { name: /referenceLists/i })
        ).not.toBeInTheDocument()
    })

    it('renders ThemeToggler and AuthButton', () => {
        renderWithProviderAndRouter(<NavBar />)

        expect(screen.getByTestId('mocked-auth-button')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-theme-toggler')).toBeInTheDocument()
    })

    it('calls navigate when a menu item is clicked', async () => {
        const user = userEvent.setup()

        renderWithProviderAndRouter(<NavBar />)

        await user.click(screen.getByRole('button', { name: /pricing/i }))
        await user.click(screen.getByRole('button', { name: /account/i }))

        expect(mockNavigate).toHaveBeenCalledTimes(2)
    })

    it('navigates when clicking a navigation button', async () => {
        const user = userEvent.setup()

        renderWithProviderAndRouter(<NavBar />)
        await user.click(screen.getByRole('button', { name: /pricing/i }))

        expect(mockNavigate).toHaveBeenCalledWith('/pricing')
    })

    it('scrolls to top when clicking the active navigation button', async () => {
        const user = userEvent.setup()

        renderWithProviderAndRouter(<NavBar />)

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
        renderWithProviderAndRouter(
            <NavBar>
                <button data-testid="mocked-child-button">Child Button</button>
            </NavBar>
        )

        expect(screen.getByTestId('mocked-child-button')).toBeInTheDocument()
    })

    describe('AppInfo', () => {
        it('renders app name and motto', () => {
            renderWithProviderAndRouter(<NavBar />)

            expect(screen.getAllByText(/Beautycase/i)).toHaveLength(2)
            expect(screen.getByText(/home:motto/i)).toBeInTheDocument()
        })

        it('renders build version from package.json', () => {
            renderWithProviderAndRouter(<NavBar />)
            const buildRegex = /build \d{4}\.\d+\.\d+/
            expect(screen.getByText(buildRegex)).toBeInTheDocument()
        })
    })
})
