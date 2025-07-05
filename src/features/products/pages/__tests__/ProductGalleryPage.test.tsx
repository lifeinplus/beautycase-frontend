import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import { mockProducts } from '../../__mocks__/productsApi'
import { useGetAllProductsQuery } from '../../productsApi'
import { ProductGalleryPage } from '../ProductGalleryPage'

vi.mock('../../../../shared/components/gallery/GalleryPage')
vi.mock('../../../../shared/components/gallery/ImageCard')
vi.mock('../../productsApi')

describe('ProductGalleryPage', () => {
    beforeEach(() => {
        vi.mocked(useGetAllProductsQuery as Mock).mockReturnValue({
            data: mockProducts,
            isLoading: false,
            error: null,
        })
    })

    it('renders list of products when data is available', () => {
        render(<ProductGalleryPage />)

        expect(screen.getByTestId('mocked-gallery-page')).toBeInTheDocument()
        expect(screen.getByText('titles.gallery')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-media-content')).toBeInTheDocument()

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
