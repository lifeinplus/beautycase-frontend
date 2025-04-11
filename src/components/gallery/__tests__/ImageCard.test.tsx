import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ImageCard } from '../ImageCard'
import { renderWithRouter } from '../../../tests/mocks/wrappers'

describe('ImageCard', () => {
    const mockData = {
        name: 'Sample Image',
        imageUrl: 'https://example.com/sample.jpg',
    }

    const mockPath = '/image/1'

    it('renders the image correctly', () => {
        renderWithRouter(<ImageCard data={mockData} path={mockPath} />)

        const image = screen.getByRole('img')
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('alt', mockData.name)
        expect(image).toHaveAttribute('src', mockData.imageUrl)
    })

    it('renders a link to the correct path', () => {
        renderWithRouter(<ImageCard data={mockData} path={mockPath} />)
        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', mockPath)
        expect(link).toHaveClass('relative')
        expect(link).toHaveClass('overflow-hidden')

        const container = screen.getByRole('link').parentElement
        expect(container).toHaveClass('img-container')
        expect(container).toHaveClass('img-container-square')
    })
})
