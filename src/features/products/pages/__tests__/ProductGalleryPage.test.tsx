import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import { mockProducts } from '../../__mocks__/productsApi'
import { useReadProductsQuery } from '../../productsApi'
import { ProductGalleryPage } from '../ProductGalleryPage'

vi.mock('../../../../components/gallery/GalleryPage')
vi.mock('../../../../components/gallery/ImageCard')
vi.mock('../../productsApi')

describe('ProductGalleryPage', () => {
    beforeEach(() => {
        vi.mocked(useReadProductsQuery as Mock).mockReturnValue({
            data: mockProducts,
            isLoading: false,
            error: null,
        })
    })

    it('renders list of products when data is available', () => {
        render(<ProductGalleryPage />)

        const galleryPage = screen.getByTestId('mocked-gallery-page')
        const title = screen.getByText('Продукты')
        const mediaContent = screen.getByTestId('mocked-media-content')

        expect(galleryPage).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(mediaContent).toBeInTheDocument()

        mockProducts.forEach((product) => {
            const imageCard = screen.getByTestId(
                `mocked-image-card-${product._id}`
            )
            const title = screen.getByText(product.name)
            const path = screen.getByText(`/products/${product._id}`)

            expect(imageCard).toBeInTheDocument()
            expect(title).toBeInTheDocument()
            expect(path).toBeInTheDocument()
        })
    })
})
