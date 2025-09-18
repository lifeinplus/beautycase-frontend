import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockCategoryWithCount } from '@/features/categories/api/__mocks__/categoriesApi'
import { ProductCategoriesMobileView } from './ProductCategoriesMobileView'

vi.mock('@/shared/components/table/mobile-view/MobileView')
vi.mock('@/shared/utils/date/formatDate')

describe('ProductCategoriesMobileView', () => {
    it('renders the MobileView component with correct props', () => {
        render(
            <ProductCategoriesMobileView categories={[mockCategoryWithCount]} />
        )

        expect(screen.getByTestId('mocked-mobile-view')).toBeInTheDocument()
        expect(screen.getByText('categories.basic')).toBeInTheDocument()
    })
})
