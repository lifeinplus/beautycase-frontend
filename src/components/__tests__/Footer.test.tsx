import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Footer } from '../Footer'

describe('Footer', () => {
    it('renders the footer with correct structure', () => {
        const { container } = render(<Footer />)

        const footer = container.querySelector('footer')
        expect(footer).toHaveAttribute('id', 'footer')
        expect(footer).toHaveClass('page-footer')

        const sections = container.querySelectorAll('section')
        expect(sections).toHaveLength(3)

        sections.forEach((section) => {
            expect(section).toHaveClass('mx-auto', 'max-w-4xl', 'p-4')
        })
    })

    it('applies responsive classes correctly', () => {
        const { container } = render(<Footer />)

        const middleSection = container.querySelectorAll('section')[1]
        expect(middleSection).toHaveClass(
            'flex',
            'flex-col',
            'gap-4',
            'sm:flex-row',
            'sm:justify-between'
        )
    })

    it('displays the heading with correct text and styling', () => {
        render(<Footer />)

        const heading = screen.getByRole('heading', { level: 4 })
        expect(heading).toHaveTextContent('footer.thanks')
        expect(heading).toHaveClass('font-heading', 'text-lg')
    })

    it('displays the contact information correctly', () => {
        render(<Footer />)

        const phone = screen.getByRole('link')
        expect(phone).toHaveAttribute('href', 'tel:+381629446904')
        expect(phone).toHaveTextContent('footer.phone')
        expect(phone).toHaveClass(
            'text-rose-500',
            'hover:underline',
            'hover:decoration-wavy',
            'dark:text-rose-400'
        )

        expect(screen.getByText(/questions/)).toBeInTheDocument()
        expect(screen.getByText(/country/)).toBeInTheDocument()
        expect(screen.getByText(/help/)).toBeInTheDocument()
    })

    it('displays the services information correctly', () => {
        render(<Footer />)
        expect(screen.getByText('footer.services')).toBeInTheDocument()
    })

    it('displays the copyright information correctly', () => {
        render(<Footer />)

        const copyrightTextRegex = /© Beautycase \d{4}\.\d+\.\d+/
        const copyright = screen.getByText(copyrightTextRegex)

        expect(copyright).toBeInTheDocument()
    })
})
