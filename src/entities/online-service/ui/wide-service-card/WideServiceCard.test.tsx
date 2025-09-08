import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { WideServiceCard } from './WideServiceCard'

describe('WideServiceCard', () => {
    const mockData = {
        name: 'Test Workshop',
        blurb: 'Test Blurb',
        priceEur: 15,
        oldPriceEur: 25,
        features: [
            'Express styling with a curling iron',
            'Surf waves with a curling iron',
            'Styling with a flat iron: features and technique',
        ],
    }

    it('renders service name correctly', () => {
        render(<WideServiceCard {...mockData} />)
        expect(screen.getByText('Test Workshop')).toBeInTheDocument()
    })

    it('displays price in EUR format', () => {
        render(<WideServiceCard {...mockData} />)
        expect(screen.getByText('€25')).toBeInTheDocument()
    })

    it('renders all features with checkmarks', () => {
        render(<WideServiceCard {...mockData} />)

        mockData.features.forEach((feature) => {
            expect(screen.getByText(feature)).toBeInTheDocument()
        })

        expect(screen.getAllByTestId('mocked-check-icon')).toHaveLength(3)
    })

    it('renders contact button with correct link', () => {
        render(<WideServiceCard {...mockData} />)

        const contactButton = screen.getByRole('link', { name: 'buttons.get' })
        expect(contactButton).toHaveAttribute(
            'href',
            'https://t.me/InnaZakharova'
        )
        expect(contactButton).toHaveAttribute('target', '_blank')
        expect(contactButton).toHaveAttribute('rel', 'noopener noreferrer')
    })
})
