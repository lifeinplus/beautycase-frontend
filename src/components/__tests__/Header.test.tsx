import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Header } from '../Header'

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

        const headingElement = screen.getByRole('heading', { level: 1 })
        expect(headingElement).toBeInTheDocument()
        expect(headingElement).toHaveClass('font-logo', 'text-2xl', 'font-bold')

        const logoLink = screen.getByRole('link', { name: /beautycase/i })
        expect(logoLink).toBeInTheDocument()
        expect(logoLink).toHaveAttribute('href', '/')
        expect(logoLink.textContent).toBe('Beautycase')
    })

    it('includes the AuthButton component', () => {
        render(<Header />)

        const authButton = screen.getByTestId('auth-button')
        expect(authButton).toBeInTheDocument()
        expect(authButton).toHaveTextContent('Sign In')

        const authButtonContainer = authButton.parentElement
        expect(authButtonContainer).toHaveClass('sm:hidden')
    })

    it('applies responsive classes correctly', () => {
        const { container } = render(<Header />)

        const navElement = container.querySelector('nav')
        expect(navElement).toHaveClass('sm:hidden')

        const authButtonContainer =
            screen.getByTestId('auth-button').parentElement
        expect(authButtonContainer).toHaveClass('sm:hidden')
    })
})
