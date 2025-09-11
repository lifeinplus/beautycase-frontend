import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockCategories } from '@/features/categories/__mocks__/categoriesApi'
import { ProductCategoriesTable } from './ProductCategoriesTable'

vi.mock('@/shared/components/table/Table')
vi.mock('@/shared/components/table/TableRow')

describe('ProductCategoriesTable', () => {
    it('renders the table headers correctly', () => {
        render(<ProductCategoriesTable categories={mockCategories} />)

        expect(screen.getByText('category:table.category')).toBeInTheDocument()
    })
})
