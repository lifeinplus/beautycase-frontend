import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { OnlineServiceCard } from './OnlineServiceCard'

describe('OnlineServiceCard', () => {
    const mockData = {
        name: 'Mini Consultation',
        priceEur: 25,
        time: '30 minutes',
        features: [
            'Analysis of your makeup questions',
            'Simple solutions for difficult moments',
            'Personalized recommendations',
        ],
    }

    it('renders service name correctly', () => {
        render(<OnlineServiceCard {...mockData} />)
        expect(screen.getByText('Mini Consultation')).toBeInTheDocument()
    })

    it('displays price in EUR format', () => {
        render(<OnlineServiceCard {...mockData} />)
        expect(screen.getByText('€25')).toBeInTheDocument()
    })

    it('shows duration information', () => {
        render(<OnlineServiceCard {...mockData} />)
        expect(screen.getByText('/ 30 minutes')).toBeInTheDocument()
    })

    it('renders all features with checkmarks', () => {
        render(<OnlineServiceCard {...mockData} />)

        mockData.features.forEach((feature) => {
            expect(screen.getByText(feature)).toBeInTheDocument()
        })

        expect(screen.getAllByTestId('mocked-check-icon')).toHaveLength(3)
    })

    it('applies popular styling when popular is true', () => {
        render(<OnlineServiceCard {...mockData} popular />)

        const container = screen.getByText('Mini Consultation').closest('div')
        expect(container).toHaveClass(/_containerPopular_/)
    })

    it('applies regular styling when popular is false', () => {
        render(<OnlineServiceCard {...mockData} />)

        const container = screen.getByText('Mini Consultation').closest('div')
        expect(container).toHaveClass(/_container_/)
    })

    it('renders contact button with correct link', () => {
        render(<OnlineServiceCard {...mockData} />)

        const contactButton = screen.getByRole('link', { name: 'button' })
        expect(contactButton).toHaveAttribute(
            'href',
            'https://t.me/InnaZakharova'
        )
        expect(contactButton).toHaveAttribute('target', '_blank')
        expect(contactButton).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('uses popular button styling for popular services', () => {
        render(<OnlineServiceCard {...mockData} popular />)

        const button = screen.getByRole('link', { name: 'button' })
        expect(button).toHaveClass(/_buttonPopular_/)
    })

    it('uses regular button styling for non-popular services', () => {
        render(<OnlineServiceCard {...mockData} />)

        const button = screen.getByRole('link', { name: 'button' })
        expect(button).toHaveClass(/_button_/)
    })
})
