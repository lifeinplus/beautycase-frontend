import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithRouter } from '@/tests/mocks/wrappers'
import { ImageCard } from './ImageCard'

describe('ImageCard', () => {
    const mockImageId = 'products/691c27584e28a506f9bdaebc/mijmxrn4ivqfbmdzwt5m'
    const mockTo = '/image/1'

    it('renders the image correctly', () => {
        renderWithRouter(<ImageCard imageId={mockImageId} to={mockTo} />)

        const image = screen.getByRole('img')
        expect(image).toBeInTheDocument()
    })

    it('renders a link to the correct path', () => {
        renderWithRouter(<ImageCard imageId={mockImageId} to={mockTo} />)
        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', mockTo)
        expect(link).toHaveClass('relative')
        expect(link).toHaveClass('overflow-hidden')
    })
})
