import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { VideoPreview, type VideoPreviewProps } from './VideoPreview'

describe('VideoPreview', () => {
    const mockProps: VideoPreviewProps = {
        imageId: 'https://example.com/image.jpg',
    }

    it('renders with the correct URL', () => {
        render(<VideoPreview {...mockProps} />)

        expect(screen.getByRole('img')).toHaveAttribute(
            'src',
            mockProps.imageId
        )
    })

    it('renders with the correct alt text', () => {
        render(<VideoPreview {...mockProps} />)

        expect(screen.getByRole('img')).toHaveAttribute('alt', 'Preview')
    })
})
