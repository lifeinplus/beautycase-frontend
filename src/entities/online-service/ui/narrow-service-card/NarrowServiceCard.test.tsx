import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { NarrowServiceCard } from './NarrowServiceCard'

describe('NarrowServiceCard', () => {
    const mockData = {
        name: 'Consultation',
        blurb: 'Test Blurb',
        priceEur: 25,
        time: '30 minutes',
        features: [
            'Analysis of your makeup questions',
            'Simple solutions for difficult moments',
            'Personalized recommendations',
        ],
    }

    it('renders service name correctly', () => {
        render(<NarrowServiceCard {...mockData} />)
        expect(screen.getByText('Consultation')).toBeInTheDocument()
    })

    it('displays price in EUR format', () => {
        render(<NarrowServiceCard {...mockData} />)
        expect(screen.getByText('€25')).toBeInTheDocument()
    })

    it('shows duration information', () => {
        render(<NarrowServiceCard {...mockData} />)
        expect(screen.getByText('/ 30 minutes')).toBeInTheDocument()
    })

    it('renders all features with checkmarks', () => {
        render(<NarrowServiceCard {...mockData} />)

        mockData.features.forEach((feature) => {
            expect(screen.getByText(feature)).toBeInTheDocument()
        })

        expect(screen.getAllByTestId('mocked-check-icon')).toHaveLength(3)
    })

    it('renders contact button with correct link', () => {
        render(<NarrowServiceCard {...mockData} />)

        const contactButton = screen.getByRole('link', { name: 'buttons.book' })
        expect(contactButton).toHaveAttribute(
            'href',
            'https://t.me/InnaZakharova'
        )
        expect(contactButton).toHaveAttribute('target', '_blank')
        expect(contactButton).toHaveAttribute('rel', 'noopener noreferrer')
    })
})
