import { screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAppSelector } from '../../../app/hooks'
import { selectRole, selectUsername } from '../../../features/auth/authSlice'
import { mockNavigate } from '../../../tests/mocks/router'
import { renderWithProvider } from '../../../tests/mocks/wrappers'
import { AdaptiveNavBar } from '../AdaptiveNavBar'

describe('AdaptiveNavBar', () => {
    beforeEach(() => {
        vi.mocked(useAppSelector).mockImplementation((selector) => {
            if (selector === selectRole) return 'mua'
            if (selector === selectUsername) return 'inna'
            return null
        })
    })

    it('renders the brand logo with responsive behavior', () => {
        renderWithProvider(<AdaptiveNavBar />)

        expect(screen.getByText('B')).toBeInTheDocument()
        expect(screen.getByText('Beautycase')).toBeInTheDocument()
    })

    it('renders navigation buttons for accessible menu items', () => {
        renderWithProvider(<AdaptiveNavBar />)

        expect(
            screen.getByRole('button', { name: /Анкета/i })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', { name: /Косметички/i })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', { name: /Личный кабинет/i })
        ).toBeInTheDocument()

        expect(
            screen.queryByRole('button', {
                name: /Справочники/i,
            })
        ).not.toBeInTheDocument()
    })

    it('renders ThemeToggler and AuthButton', () => {
        renderWithProvider(<AdaptiveNavBar />)

        expect(
            screen.getByRole('button', { name: /Light mode/i })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', { name: /Logout/i })
        ).toBeInTheDocument()
    })

    it('calls navigate when a menu item is clicked', () => {
        renderWithProvider(<AdaptiveNavBar />)

        fireEvent.click(screen.getByRole('button', { name: /Этапы/i }))
        fireEvent.click(screen.getByRole('button', { name: /Уроки/i }))

        expect(mockNavigate).toHaveBeenCalledTimes(2)
    })

    it('applies active class to current path navigation button', () => {
        renderWithProvider(<AdaptiveNavBar />)

        expect(screen.getByRole('button', { name: /Анкета/i })).toHaveClass(
            'nav-btn-active'
        )

        expect(
            screen.getByRole('button', { name: /Косметички/i })
        ).not.toHaveClass('nav-btn-active')
    })

    it('navigates when clicking a navigation button', () => {
        renderWithProvider(<AdaptiveNavBar />)

        fireEvent.click(screen.getByRole('button', { name: /Косметички/i }))

        expect(mockNavigate).toHaveBeenCalledWith('/makeup_bags')
    })

    it('scrolls to top when clicking the active navigation button', () => {
        renderWithProvider(<AdaptiveNavBar />)

        fireEvent.click(screen.getByRole('button', { name: /Анкета/i }))

        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            behavior: 'smooth',
        })

        expect(mockNavigate).not.toHaveBeenCalled()
    })

    it('renders children content', () => {
        renderWithProvider(
            <AdaptiveNavBar>
                <button data-testid="child-content">Child Content</button>
            </AdaptiveNavBar>
        )

        expect(screen.getByTestId('child-content')).toBeInTheDocument()
    })
})
