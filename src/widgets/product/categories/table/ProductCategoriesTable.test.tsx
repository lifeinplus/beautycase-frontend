import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockCategoryWithCount } from '@/features/categories/api/__mocks__/categoriesApi'
import { ProductCategoriesTable } from './ProductCategoriesTable'

vi.mock('@/shared/components/table/table/Table')
vi.mock('@/shared/components/table/table-row/TableRow')

describe('ProductCategoriesTable', () => {
    it('renders the table headers correctly', () => {
        render(<ProductCategoriesTable categories={[mockCategoryWithCount]} />)

        expect(screen.getByText('category:table.category')).toBeInTheDocument()
    })
})
