import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Hero } from '../Hero'

vi.mock('../../ui/Image')

describe('Hero', () => {
    const mockProps = {
        headline: 'Welcome to our site',
        byline: 'Discover amazing content',
        imgUrl: '/hero-image.jpg',
        content: 'Detailed content goes here',
    }

    it('renders headline when provided', () => {
        render(<Hero headline={mockProps.headline} />)

        expect(screen.getByText(mockProps.headline)).toBeInTheDocument()
        expect(screen.getByText(mockProps.headline)).toHaveClass(
            'hero-headline'
        )
    })

    it('renders byline when provided', () => {
        render(<Hero byline={mockProps.byline} />)

        expect(screen.getByText(mockProps.byline)).toBeInTheDocument()
        expect(screen.getByText(mockProps.byline)).toHaveClass('hero-byline')
    })

    it('renders content when provided', () => {
        render(<Hero content={mockProps.content} />)

        expect(screen.getByText(mockProps.content)).toBeInTheDocument()
        expect(screen.getByText(mockProps.content)).toHaveClass('hero-content')
    })

    it('renders image when imgUrl is provided', () => {
        render(<Hero headline={mockProps.headline} imgUrl={mockProps.imgUrl} />)

        const image = screen.getByTestId('mocked-image')

        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('alt', mockProps.headline)
        expect(image).toHaveAttribute('src', mockProps.imgUrl)
        expect(image).toHaveClass('hero-img')
    })

    it('renders with all props provided', () => {
        render(<Hero {...mockProps} />)

        const headline = screen.queryByText(mockProps.headline)
        const image = screen.getByTestId('mocked-image')
        const byline = screen.queryByText(mockProps.byline)
        const content = screen.getByText(mockProps.content)

        expect(headline).toBeInTheDocument()
        expect(byline).toBeInTheDocument()
        expect(image).toHaveAttribute('src', mockProps.imgUrl)
        expect(content).toBeInTheDocument()
    })

    it('does not render elements when props are missing', () => {
        const { container } = render(<Hero />)

        const h1 = screen.queryByRole('heading', { level: 1 })
        const h2 = screen.queryByRole('heading', { level: 2 })
        const image = screen.queryByTestId('mocked-image')
        const content = container.querySelector('.hero-content')

        expect(h1).not.toBeInTheDocument()
        expect(h2).not.toBeInTheDocument()
        expect(image).not.toBeInTheDocument()
        expect(content).not.toBeInTheDocument()
    })
})
