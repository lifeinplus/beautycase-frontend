import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Footer } from '../Footer'

describe('Footer', () => {
    it('renders the footer with correct structure', () => {
        const { container } = render(<Footer />)

        const footerElement = container.querySelector('footer')
        expect(footerElement).toBeInTheDocument()
        expect(footerElement).toHaveAttribute('id', 'footer')
        expect(footerElement).toHaveClass('page-footer')

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

        const headingElement = screen.getByRole('heading', { level: 4 })
        expect(headingElement).toBeInTheDocument()
        expect(headingElement).toHaveTextContent('Спасибо, что выбрали меня!')
        expect(headingElement).toHaveClass('font-heading', 'text-lg')
    })

    it('displays the contact information correctly', () => {
        render(<Footer />)

        const phoneLink = screen.getByRole('link')
        expect(phoneLink).toBeInTheDocument()
        expect(phoneLink).toHaveAttribute('href', 'tel:+381629446904')
        expect(phoneLink).toHaveTextContent('+381 62 9446 904 (Сербия)')
        expect(phoneLink).toHaveClass(
            'text-rose-500',
            'hover:underline',
            'hover:decoration-wavy',
            'dark:text-rose-400'
        )

        const contactSection = screen.getByText(/Если остались вопросы/)
        expect(contactSection).toContainElement(phoneLink)
        expect(contactSection).toHaveTextContent('Буду рада помочь)')
    })

    it('displays the services information correctly', () => {
        render(<Footer />)

        const servicesText = screen.getByText(/Мои услуги:/)
        expect(servicesText).toBeInTheDocument()
        expect(servicesText).toHaveTextContent(
            'Мои услуги: все виды макияжа, укладки, причёски, обучение, подарочные сертификаты'
        )
    })

    it('displays the copyright information correctly', () => {
        render(<Footer />)

        const copyrightTextRegex = /© Beautycase \d{4}\.\d+\.\d+/
        const copyrightElement = screen.getByText(copyrightTextRegex)

        expect(copyrightElement).toBeInTheDocument()
    })
})
