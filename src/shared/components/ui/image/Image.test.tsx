import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import config from '@/app/config/config'
import { Image } from './Image'

describe('Image', () => {
    it('renders with provided src', () => {
        const testSrc = 'test-image.jpg'
        render(<Image src={testSrc} alt="Test image" />)

        expect(screen.getByAltText('Test image')).toHaveAttribute(
            'src',
            testSrc
        )
    })

    it('applies custom className when provided', () => {
        const customClass = 'custom-image-class'

        render(<Image src="test.jpg" alt="Test" className={customClass} />)

        expect(screen.getByAltText('Test')).toHaveClass(customClass)
    })

    it('changes to default image on error', () => {
        render(<Image src="invalid-image.jpg" alt="Original alt" />)

        const imgElement = screen.getByAltText('Original alt')
        fireEvent.error(imgElement)

        expect(imgElement).toHaveAttribute('alt', 'Default Image')
        expect(imgElement).toHaveAttribute(
            'src',
            config.cloudinary.defaultThumbnailUrl
        )
    })
})
