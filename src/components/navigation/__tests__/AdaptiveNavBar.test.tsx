import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useLocation } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useAppSelector } from '../../../app/hooks'
import { selectRole, selectUsername } from '../../../features/auth/authSlice'
import { mockLocation, mockNavigate } from '../../../tests/mocks/router'
import { renderWithProviders } from '../../../tests/mocks/wrappers'
import { AdaptiveNavBar } from '../AdaptiveNavBar'

vi.mock('../../../app/hooks')
vi.mock('../../../features/auth/components/AuthButton')
vi.mock('../../../features/theme/ThemeToggler')
vi.mock('../NavigationButton')

describe('AdaptiveNavBar', () => {
    beforeEach(() => {
        vi.mocked(useAppSelector).mockImplementation((selector) => {
            if (selector === selectRole) return 'mua'
            if (selector === selectUsername) return 'testuser'
            return null
        })

        vi.mocked(useLocation).mockReturnValue({
            ...mockLocation,
            pathname: '/questionnaire',
        })
    })

    it('renders the brand logo with responsive behavior', () => {
        renderWithProviders(<AdaptiveNavBar />)

        expect(screen.getByText('B')).toBeInTheDocument()
        expect(screen.getByText('Beautycase')).toBeInTheDocument()
    })

    it('renders navigation buttons for accessible menu items', () => {
        renderWithProviders(<AdaptiveNavBar />)

        const questionnaire = screen.getByRole('button', { name: /Анкета/i })

        const btnMakeupBags = screen.getByRole('button', {
            name: /Косметички/i,
        })

        const btnAccount = screen.getByRole('button', {
            name: /Личный кабинет/i,
        })

        const btnReferenceLists = screen.queryByRole('button', {
            name: /Справочники/i,
        })

        expect(questionnaire).toBeInTheDocument()
        expect(btnMakeupBags).toBeInTheDocument()
        expect(btnAccount).toBeInTheDocument()

        expect(btnReferenceLists).not.toBeInTheDocument()
    })

    it('renders ThemeToggler and AuthButton', () => {
        renderWithProviders(<AdaptiveNavBar />)

        const authButton = screen.getByTestId('mocked-auth-button')
        const themeToggler = screen.getByTestId('mocked-theme-toggler')

        expect(authButton).toBeInTheDocument()
        expect(themeToggler).toBeInTheDocument()
    })

    it('calls navigate when a menu item is clicked', async () => {
        const user = userEvent.setup()

        renderWithProviders(<AdaptiveNavBar />)

        const btnStages = screen.getByRole('button', { name: /Этапы/i })
        const btnLessons = screen.getByRole('button', { name: /Уроки/i })

        await user.click(btnStages)
        await user.click(btnLessons)

        expect(mockNavigate).toHaveBeenCalledTimes(2)
    })

    it('applies active class to current path navigation button', () => {
        renderWithProviders(<AdaptiveNavBar />)

        const btnQuestionnaire = screen.getByRole('button', { name: /Анкета/i })

        const btnMakeupBags = screen.getByRole('button', {
            name: /Косметички/i,
        })

        expect(btnQuestionnaire).toHaveClass('nav-btn-active')
        expect(btnMakeupBags).not.toHaveClass('nav-btn-active')
    })

    it('navigates when clicking a navigation button', async () => {
        const user = userEvent.setup()

        renderWithProviders(<AdaptiveNavBar />)

        const btnMakeupBags = screen.getByRole('button', {
            name: /Косметички/i,
        })

        await user.click(btnMakeupBags)

        expect(mockNavigate).toHaveBeenCalledWith('/makeup_bags')
    })

    it('scrolls to top when clicking the active navigation button', async () => {
        const user = userEvent.setup()

        renderWithProviders(<AdaptiveNavBar />)

        const btnQuestionnaire = screen.getByRole('button', { name: /Анкета/i })
        await user.click(btnQuestionnaire)

        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            behavior: 'smooth',
        })

        expect(mockNavigate).not.toHaveBeenCalled()
    })

    it('renders children content', () => {
        renderWithProviders(
            <AdaptiveNavBar>
                <button data-testid="mocked-child-content">
                    Child Content
                </button>
            </AdaptiveNavBar>
        )

        expect(screen.getByTestId('mocked-child-content')).toBeInTheDocument()
    })
})
