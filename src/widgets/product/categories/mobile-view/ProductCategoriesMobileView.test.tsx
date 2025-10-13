import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockCategoryWithCount } from '@/features/categories/api/__mocks__/categoriesApi'
import { renderWithRouter } from '@/tests/mocks/wrappers'
import { ProductCategoriesMobileView } from './ProductCategoriesMobileView'

vi.mock('@/shared/utils/date/formatDate')

describe('ProductCategoriesMobileView', () => {
    it('renders the MobileView component with correct props', () => {
        renderWithRouter(
            <ProductCategoriesMobileView categories={[mockCategoryWithCount]} />
        )

        expect(screen.getByText('categories.basic')).toBeInTheDocument()
    })
})
