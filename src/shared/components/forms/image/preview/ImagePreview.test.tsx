import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ImagePreview, type ImagePreviewProps } from './ImagePreview'

describe('ImagePreview', () => {
    const mockProps: ImagePreviewProps = {
        url: 'https://example.com/image.jpg',
    }

    it('renders with the correct URL', () => {
        render(<ImagePreview {...mockProps} />)

        expect(screen.getByRole('img')).toHaveAttribute('src', mockProps.url)
    })

    it('renders with the correct alt text', () => {
        render(<ImagePreview {...mockProps} />)

        expect(screen.getByRole('img')).toHaveAttribute('alt', 'Preview')
    })
})
