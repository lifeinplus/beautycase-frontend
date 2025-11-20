import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ImagePreview, type ImagePreviewProps } from './ImagePreview'

describe('ImagePreview', () => {
    const mockProps: ImagePreviewProps = {
        imageId: 'products/691c27584e28a506f9bdaebc/mijmxrn4ivqfbmdzwt5m',
        onDelete: () => {},
    }

    it('renders with the correct URL', () => {
        render(<ImagePreview {...mockProps} />)

        expect(screen.getByRole('img')).toHaveAttribute(
            'src',
            mockProps.imageId
        )
    })

    it('renders with the correct alt text', () => {
        render(<ImagePreview {...mockProps} />)

        expect(screen.getByRole('img')).toHaveAttribute('alt', 'Preview')
    })
})
