import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ROUTES } from '@/shared/config/routes'
import { renderWithRouter } from '@/tests/mocks/wrappers'
import { Header } from './Header'

vi.mock('@/features/auth/components/auth-button/AuthButton')
vi.mock('@/features/theme/toggler/ThemeToggler')

describe('Header', () => {
    it('renders the header with correct structure', () => {
        const { container } = renderWithRouter(<Header />)

        const navElement = container.querySelector('nav')
        expect(navElement).toBeInTheDocument()
        expect(navElement).toHaveClass(
            'sticky',
            'top-0',
            'z-10',
            'border-b',
            'md:hidden'
        )

        const headerElement = container.querySelector('header')
        expect(headerElement).toBeInTheDocument()
        expect(headerElement).toHaveClass(
            'mx-auto',
            'flex',
            'max-w-4xl',
            'items-center',
            'justify-between'
        )
    })

    it('displays the logo with correct text and styling', () => {
        renderWithRouter(<Header />)

        expect(screen.getByRole('heading', { level: 1 })).toHaveClass(/logo/)

        const logoLink = screen.getByRole('link', { name: /beautycase/i })
        expect(logoLink).toBeInTheDocument()
        expect(logoLink).toHaveAttribute('href', ROUTES.home)
        expect(logoLink.textContent).toBe('Beautycase')
    })

    it('includes the AuthButton component', () => {
        renderWithRouter(<Header />)

        const authButton = screen.getByTestId('mocked-auth-button')
        expect(authButton).toHaveTextContent('Sign In')
        expect(authButton.parentElement).toHaveClass('flex')
    })

    it('applies responsive classes correctly', () => {
        const { container } = renderWithRouter(<Header />)

        expect(container.querySelector('nav')).toHaveClass('md:hidden')

        expect(
            screen.getByTestId('mocked-auth-button').parentElement
        ).toHaveClass('flex')
    })
})
