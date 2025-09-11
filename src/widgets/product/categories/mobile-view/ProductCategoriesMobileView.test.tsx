import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockCategories } from '@/features/categories/__mocks__/categoriesApi'
import { ProductCategoriesMobileView } from './ProductCategoriesMobileView'

vi.mock('@/shared/components/table/MobileView')
vi.mock('@/shared/utils/date')

describe('ProductCategoriesMobileView', () => {
    it('renders the MobileView component with correct props', () => {
        render(<ProductCategoriesMobileView categories={mockCategories} />)

        expect(screen.getByTestId('mocked-mobile-view')).toBeInTheDocument()
        expect(screen.getByText('categories.basic')).toBeInTheDocument()
    })
})
