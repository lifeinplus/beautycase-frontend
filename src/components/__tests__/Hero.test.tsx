import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Hero } from '../Hero'

const props = {
    headline: 'Welcome to our site',
    byline: 'Discover amazing content',
    imgUrl: '/hero-image.jpg',
    content: 'Detailed content goes here',
}

describe('Hero', () => {
    it('renders headline when provided', () => {
        render(<Hero headline={props.headline} />)

        expect(screen.getByText(props.headline)).toBeInTheDocument()
        expect(screen.getByText(props.headline)).toHaveClass('hero-headline')
    })

    it('renders byline when provided', () => {
        render(<Hero byline={props.byline} />)

        expect(screen.getByText(props.byline)).toBeInTheDocument()
        expect(screen.getByText(props.byline)).toHaveClass('hero-byline')
    })

    it('renders content when provided', () => {
        render(<Hero content={props.content} />)

        expect(screen.getByText(props.content)).toBeInTheDocument()
        expect(screen.getByText(props.content)).toHaveClass('hero-content')
    })

    it('renders image when imgUrl is provided', () => {
        render(<Hero headline={props.headline} imgUrl={props.imgUrl} />)

        const image = screen.getByRole('img')

        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('alt', props.headline)
        expect(image).toHaveAttribute('src', props.imgUrl)
        expect(image).toHaveClass('hero-img')
    })

    it('renders with all props provided', () => {
        render(<Hero {...props} />)

        expect(screen.queryByText(props.headline)).toBeInTheDocument()
        expect(screen.queryByText(props.byline)).toBeInTheDocument()
        expect(screen.getByRole('img')).toHaveAttribute('src', props.imgUrl)
        expect(screen.getByText(props.content)).toBeInTheDocument()
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

        expect(container.querySelector('.hero-content')).not.toBeInTheDocument()
    })
})
