import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Hero } from './Hero'

describe('Hero', () => {
    const mockProps = {
        headline: 'Welcome to our site',
        byline: 'Discover amazing content',
        imgUrl: 'https://cloudinary.com/image.jpg',
        content: 'Detailed content goes here',
    }

    it('renders image when imgUrl is provided', () => {
        render(<Hero headline={mockProps.headline} imgUrl={mockProps.imgUrl} />)

        const image = screen.getByRole('img')
        expect(image).toHaveAttribute('alt', mockProps.headline)
        expect(image).toHaveAttribute('src', mockProps.imgUrl)
    })

    it('renders with all props provided', () => {
        render(<Hero {...mockProps} />)

        expect(screen.queryByText(mockProps.headline)).toBeInTheDocument()
        expect(screen.queryByText(mockProps.byline)).toBeInTheDocument()
        expect(screen.getByRole('img')).toHaveAttribute('src', mockProps.imgUrl)
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
