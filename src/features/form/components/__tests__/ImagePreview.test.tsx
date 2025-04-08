import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { type ImageProps } from '../../../../components/ui/Image'
import { ImagePreview } from '../ImagePreview'

vi.mock('../../../../components/ui/Image', () => ({
    Image: ({ src, alt, className }: ImageProps) => (
        <img
            src={src}
            alt={alt}
            className={className}
            data-testid="mocked-image"
        />
    ),
}))

describe('ImagePreview', () => {
    const mockUrl = 'https://example.com/image.jpg'

    it('renders with the correct URL', () => {
        render(<ImagePreview url={mockUrl} />)

        const image = screen.getByTestId('mocked-image')
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src', mockUrl)
    })

    it('has the correct className on the image', () => {
        render(<ImagePreview url={mockUrl} />)

        const image = screen.getByTestId('mocked-image')
        expect(image).toHaveClass('img')
        expect(image).toHaveClass('rounded-xl')
    })

    it('renders with the correct alt text', () => {
        render(<ImagePreview url={mockUrl} />)

        const image = screen.getByTestId('mocked-image')
        expect(image).toHaveAttribute('alt', 'Preview')
    })

    it('renders container with correct class', () => {
        render(<ImagePreview url={mockUrl} />)

        const container = screen.getByTestId('mocked-image').parentElement
        expect(container).toHaveClass('form-preview')
    })
})
