import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockCategories } from '@/features/categories/api/__mocks__/categoriesApi'
import { useGetMineProductCategoriesWithCountsQuery } from '@/features/categories/api/categoriesApi'
import { renderWithProviders } from '@/tests/mocks/wrappers'
import { ProductGallery } from './ProductGallery'

vi.mock('@/features/categories/api/categoriesApi')
vi.mock('@/features/products/api/productsApi')
vi.mock('@/shared/components/layout/header/Header')
vi.mock('@/widgets/product/categories/mobile-view/ProductCategoriesMobileView')
vi.mock('@/widgets/product/categories/table/ProductCategoriesTable')

describe('ProductGallery', () => {
    beforeEach(() => {
        vi.mocked(
            useGetMineProductCategoriesWithCountsQuery as Mock
        ).mockReturnValue({
            data: mockCategories,
            isLoading: false,
            error: null,
        })
    })

    it('renders mobile-view and table when data is available', () => {
        renderWithProviders(<ProductGallery />)

        expect(screen.getAllByText('titles.gallery')).toHaveLength(2)

        expect(
            screen.getByTestId('mocked-product-categories-mobile-view')
        ).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-product-categories-table')
        ).toBeInTheDocument()
    })
})
