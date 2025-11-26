import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import config from '@/app/config/config'
import { ImageSection } from './ImageSection'

describe('ImageSection', () => {
    it('renders without crashing and shows first image', () => {
        render(
            <ImageSection
                imageIds={['img1']}
                defaultImageId={config.cloudinary.defaultProductId}
            />
        )
        expect(screen.getByTestId('mocked-advanced-image')).toBeInTheDocument()
    })

    it('does not show arrows when only one image exists', () => {
        render(
            <ImageSection
                imageIds={['img1']}
                defaultImageId={config.cloudinary.defaultProductId}
            />
        )

        expect(
            screen.queryByRole('button', { name: 'Previous image' })
        ).not.toBeInTheDocument()
        expect(
            screen.queryByRole('button', { name: 'Next image' })
        ).not.toBeInTheDocument()
    })

    it('shows only Next arrow when on first image', () => {
        render(
            <ImageSection
                imageIds={['img1', 'img2', 'img3']}
                defaultImageId={config.cloudinary.defaultProductId}
            />
        )

        expect(
            screen.queryByRole('button', { name: 'Previous image' })
        ).not.toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Next image' })
        ).toBeInTheDocument()
    })

    it('clicking Next arrow shows next image', () => {
        render(
            <ImageSection
                imageIds={['img1', 'img2', 'img3']}
                defaultImageId={config.cloudinary.defaultProductId}
            />
        )

        fireEvent.click(screen.getByRole('button', { name: 'Next image' }))

        expect(screen.getByTestId('mocked-advanced-image')).toBeInTheDocument()
    })

    it('clicking Prev arrow shows previous image', () => {
        render(
            <ImageSection
                imageIds={['img1', 'img2', 'img3']}
                defaultImageId={config.cloudinary.defaultProductId}
            />
        )

        fireEvent.click(screen.getByRole('button', { name: 'Next image' }))
        fireEvent.click(screen.getByRole('button', { name: 'Previous image' }))

        expect(screen.getByTestId('mocked-advanced-image')).toBeInTheDocument()
    })

    it('hides Next arrow on last image', () => {
        render(
            <ImageSection
                imageIds={['img1', 'img2']}
                defaultImageId={config.cloudinary.defaultProductId}
            />
        )

        fireEvent.click(screen.getByRole('button', { name: 'Next image' }))

        expect(
            screen.queryByRole('button', { name: 'Next image' })
        ).not.toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Previous image' })
        ).toBeInTheDocument()
    })

    it('renders dots and clicking a dot switches image', () => {
        render(
            <ImageSection
                imageIds={['img1', 'img2', 'img3']}
                defaultImageId={config.cloudinary.defaultProductId}
            />
        )

        const dots = screen
            .getAllByRole('button')
            .filter((b) =>
                ['Previous image', 'Next image'].includes(b.dataset.testid!)
                    ? false
                    : true
            )

        fireEvent.click(dots[2])

        expect(screen.getByTestId('mocked-advanced-image')).toBeInTheDocument()
    })
})
