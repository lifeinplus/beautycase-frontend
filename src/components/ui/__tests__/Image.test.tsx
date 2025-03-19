import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import config from '../../../config'
import { Image } from '../Image'

describe('Image', () => {
    it('renders with provided src', () => {
        const testSrc = 'test-image.jpg'
        render(<Image src={testSrc} alt="Test image" />)

        const imgElement = screen.getByAltText('Test image')
        expect(imgElement).toBeInTheDocument()
        expect(imgElement).toHaveAttribute('src', testSrc)
    })

    it('applies default className when none is provided', () => {
        render(<Image src="test.jpg" alt="Test" />)
        const imgElement = screen.getByAltText('Test')
        expect(imgElement).toHaveClass('img')
    })

    it('applies custom className when provided', () => {
        const customClass = 'custom-image-class'
        render(<Image src="test.jpg" alt="Test" className={customClass} />)
        const imgElement = screen.getByAltText('Test')
        expect(imgElement).toHaveClass(customClass)
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

    it('handles empty props gracefully', () => {
        render(<Image />)

        const imgElement = screen.getByRole('img')
        expect(imgElement).toBeInTheDocument()
        expect(imgElement).toHaveAttribute('class', 'img')
    })
})
