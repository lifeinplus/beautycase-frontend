import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Header } from '../Header'

vi.mock('../../features/auth/components/AuthButton')
vi.mock('../../features/theme/ThemeToggler')
vi.mock('../ui/LogoLink')
vi.mock('../LanguageSwitcher')

describe('Header', () => {
    it('renders the header with correct structure', () => {
        const { container } = render(<Header />)

        const navElement = container.querySelector('nav')
        expect(navElement).toBeInTheDocument()
        expect(navElement).toHaveClass(
            'sticky',
            'top-0',
            'z-10',
            'border-b',
            'sm:hidden'
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
        render(<Header />)

        expect(screen.getByRole('heading', { level: 1 })).toHaveClass(
            'nav-logo'
        )

        const logoLink = screen.getByRole('link', { name: /beautycase/i })
        expect(logoLink).toBeInTheDocument()
        expect(logoLink).toHaveAttribute('href', '/')
        expect(logoLink.textContent).toBe('Beautycase')
    })

    it('includes the AuthButton component', () => {
        render(<Header />)

        const authButton = screen.getByTestId('mocked-auth-button')
        expect(authButton).toHaveTextContent('Sign In')
        expect(authButton.parentElement).toHaveClass('flex')
    })

    it('applies responsive classes correctly', () => {
        const { container } = render(<Header />)

        expect(container.querySelector('nav')).toHaveClass('sm:hidden')

        expect(
            screen.getByTestId('mocked-auth-button').parentElement
        ).toHaveClass('flex')
    })
})
