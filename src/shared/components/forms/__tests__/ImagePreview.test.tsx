import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ImagePreview, type ImagePreviewProps } from '../ImagePreview'

vi.mock('@/shared/components/ui/Image')

describe('ImagePreview', () => {
    const mockProps: ImagePreviewProps = {
        url: 'https://example.com/image.jpg',
    }

    it('renders with the correct URL', () => {
        render(<ImagePreview {...mockProps} />)

        expect(screen.getByTestId('mocked-image')).toHaveAttribute(
            'src',
            mockProps.url
        )
    })

    it('has the correct className on the image', () => {
        render(<ImagePreview {...mockProps} />)

        expect(screen.getByTestId('mocked-image')).toHaveClass(/img/)
        expect(screen.getByTestId('mocked-image')).toHaveClass('rounded-xl')
    })

    it('renders with the correct alt text', () => {
        render(<ImagePreview {...mockProps} />)

        expect(screen.getByTestId('mocked-image')).toHaveAttribute(
            'alt',
            'Preview'
        )
    })

    it('renders container with correct class', () => {
        render(<ImagePreview {...mockProps} />)

        const container = screen.getByTestId('mocked-image').parentElement
        expect(container).toHaveClass(/preview/)
    })
})
