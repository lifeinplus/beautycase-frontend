import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockCategories } from '@/features/categories/api/__mocks__/categoriesApi'
import { useGetProductCategoriesWithCountsQuery } from '@/features/categories/api/categoriesApi'
import { ProductGallery } from './ProductGallery'

vi.mock('@/features/categories/api/categoriesApi')
vi.mock('@/features/products/api/productsApi')
vi.mock('@/shared/components/gallery/image-card/ImageCard')
vi.mock('@/shared/components/layout/header/Header')
vi.mock('@/widgets/product/categories/mobile-view/ProductCategoriesMobileView')
vi.mock('@/widgets/product/categories/table/ProductCategoriesTable')

describe('ProductGallery', () => {
    beforeEach(() => {
        vi.mocked(
            useGetProductCategoriesWithCountsQuery as Mock
        ).mockReturnValue({
            data: mockCategories,
            isLoading: false,
            error: null,
        })
    })

    it('renders mobile-view and table when data is available', () => {
        render(<ProductGallery />)

        expect(screen.getByText('titles.gallery')).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-product-categories-mobile-view')
        ).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-product-categories-table')
        ).toBeInTheDocument()
    })
})
