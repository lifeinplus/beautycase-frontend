import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockCategories } from '@/features/categories/__mocks__/categoriesApi'
import { useGetProductCategoriesQuery } from '@/features/categories/categoriesApi'
import { mockProducts } from '@/features/products/__mocks__/productsApi'
import { useGetProductsWithoutCategoryQuery } from '@/features/products/productsApi'
import { ProductGallery } from './ProductGallery'

vi.mock('@/features/categories/categoriesApi')
vi.mock('@/features/products/productsApi')
vi.mock('@/shared/components/common/Hero')
vi.mock('@/shared/components/gallery/ImageCard')
vi.mock('@/shared/components/layout/Header')
vi.mock('@/widgets/product/categories/mobile-view/ProductCategoriesMobileView')
vi.mock('@/widgets/product/categories/table/ProductCategoriesTable')

describe('ProductGallery', () => {
    beforeEach(() => {
        vi.mocked(useGetProductCategoriesQuery as Mock).mockReturnValue({
            data: mockCategories,
            isLoading: false,
            error: null,
        })

        vi.mocked(useGetProductsWithoutCategoryQuery as Mock).mockReturnValue({
            data: mockProducts,
            isLoading: false,
            error: null,
        })
    })

    it('renders list of products when data is available', () => {
        render(<ProductGallery />)

        expect(screen.getByText('titles.gallery')).toBeInTheDocument()

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
