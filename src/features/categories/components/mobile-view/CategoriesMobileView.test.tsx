import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { Category } from '../../types'
import { CategoriesMobileView } from './CategoriesMobileView'

vi.mock('@/shared/components/forms/button/Button')

describe('CategoriesMobileView', () => {
    const mockCategories: Category[] = [
        { _id: '1', name: 'Category A', type: 'Category Type' },
        { _id: '2', name: 'Category B', type: 'Category Type' },
    ]

    const mockOnDelete = vi.fn()
    const mockOnEdit = vi.fn()

    it('renders brands correctly', () => {
        render(
            <CategoriesMobileView
                items={mockCategories}
                onDelete={mockOnDelete}
                onEdit={mockOnEdit}
            />
        )

        expect(screen.getByText('Category A')).toBeInTheDocument()
        expect(screen.getByText('Category B')).toBeInTheDocument()
    })

    it('calls onEdit when edit button is clicked', async () => {
        const user = userEvent.setup()

        render(
            <CategoriesMobileView
                items={mockCategories}
                onDelete={mockOnDelete}
                onEdit={mockOnEdit}
            />
        )

        const buttons = screen.getAllByTestId('mocked-button')
        const editCategoryA = buttons[0]

        await user.click(editCategoryA)

        expect(mockOnEdit).toHaveBeenCalledTimes(1)
        expect(mockOnEdit).toHaveBeenCalledWith(mockCategories[0])
    })

    it('calls onDelete when delete button is clicked', async () => {
        const user = userEvent.setup()

        render(
            <CategoriesMobileView
                items={mockCategories}
                onDelete={mockOnDelete}
                onEdit={mockOnEdit}
            />
        )

        const buttons = screen.getAllByTestId('mocked-button')
        const deleteCategoryB = buttons[3]

        await user.click(deleteCategoryB)

        expect(mockOnDelete).toHaveBeenCalledTimes(1)
        expect(mockOnDelete).toHaveBeenCalledWith(mockCategories[1])
    })
})
