import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Hero } from '../Hero'

vi.mock('../../ui/Image')

describe('Hero', () => {
    const mockProps = {
        headline: 'Welcome to our site',
        byline: 'Discover amazing content',
        imgUrl: '/image/jpg',
        content: 'Detailed content goes here',
    }

    it('renders headline when provided', () => {
        render(<Hero headline={mockProps.headline} />)
        expect(screen.getByText(mockProps.headline)).toHaveClass(/headline/)
    })

    it('renders byline when provided', () => {
        render(<Hero byline={mockProps.byline} />)
        expect(screen.getByText(mockProps.byline)).toHaveClass(/byline/)
    })

    it('renders content when provided', () => {
        render(<Hero content={mockProps.content} />)
        expect(screen.getByText(mockProps.content)).toHaveClass(/content/)
    })

    it('renders image when imgUrl is provided', () => {
        render(<Hero headline={mockProps.headline} imgUrl={mockProps.imgUrl} />)

        const image = screen.getByTestId('mocked-image')
        expect(image).toHaveAttribute('alt', mockProps.headline)
        expect(image).toHaveAttribute('src', mockProps.imgUrl)
        expect(image).toHaveClass(/img/)
    })

    it('renders with all props provided', () => {
        render(<Hero {...mockProps} />)

        expect(screen.queryByText(mockProps.headline)).toBeInTheDocument()
        expect(screen.queryByText(mockProps.byline)).toBeInTheDocument()

        expect(screen.getByTestId('mocked-image')).toHaveAttribute(
            'src',
            mockProps.imgUrl
        )

        expect(screen.getByText(mockProps.content)).toBeInTheDocument()
    })

    it('does not render elements when props are missing', () => {
        const { container } = render(<Hero />)

        expect(
            screen.queryByRole('heading', { level: 1 })
        ).not.toBeInTheDocument()

        expect(
            screen.queryByRole('heading', { level: 2 })
        ).not.toBeInTheDocument()

        expect(screen.queryByTestId('mocked-image')).not.toBeInTheDocument()

        expect(
            container.querySelector("[class*='content']")
        ).not.toBeInTheDocument()
    })
})
