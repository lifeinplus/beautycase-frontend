import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockProducts } from '@/features/products/__mocks__/productsApi'
import { useGetAllProductsQuery } from '@/features/products/productsApi'
import { ProductGallery } from './ProductGallery'

vi.mock('@/features/products/productsApi')
vi.mock('@/shared/components/gallery/ImageCard')
vi.mock('@/widgets/view/gallery/Gallery')

describe('ProductGallery', () => {
    beforeEach(() => {
        vi.mocked(useGetAllProductsQuery as Mock).mockReturnValue({
            data: mockProducts,
            isLoading: false,
            error: null,
        })
    })

    it('renders list of products when data is available', () => {
        render(<ProductGallery />)

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
