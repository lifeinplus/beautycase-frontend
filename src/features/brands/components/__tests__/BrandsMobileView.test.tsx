import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, vi, expect, it } from 'vitest'

import type { Brand } from '../../types'
import { BrandsMobileView } from '../BrandsMobileView'

describe('BrandsMobileView', () => {
    const mockBrands: Brand[] = [
        { _id: '1', name: 'Brand A' },
        { _id: '2', name: 'Brand B' },
    ]

    const mockOnDelete = vi.fn()
    const mockOnEdit = vi.fn()

    it('renders brands correctly', () => {
        render(
            <BrandsMobileView
                items={mockBrands}
                onDelete={mockOnDelete}
                onEdit={mockOnEdit}
            />
        )

        expect(screen.getByText('Brand A')).toBeInTheDocument()
        expect(screen.getByText('Brand B')).toBeInTheDocument()
    })

    it('calls onEdit when edit button is clicked', async () => {
        const user = userEvent.setup()

        render(
            <BrandsMobileView
                items={mockBrands}
                onDelete={mockOnDelete}
                onEdit={mockOnEdit}
            />
        )

        const editButtons = screen.getAllByRole('button', {
            name: /edit/i,
        })

        await user.click(editButtons[0])

        expect(mockOnEdit).toHaveBeenCalledTimes(1)
        expect(mockOnEdit).toHaveBeenCalledWith(mockBrands[0])
    })

    it('calls onDelete when delete button is clicked', async () => {
        const user = userEvent.setup()

        render(
            <BrandsMobileView
                items={mockBrands}
                onDelete={mockOnDelete}
                onEdit={mockOnEdit}
            />
        )

        const deleteButtons = screen.getAllByRole('button', {
            name: /delete/i,
        })

        await user.click(deleteButtons[1])

        expect(mockOnDelete).toHaveBeenCalledTimes(1)
        expect(mockOnDelete).toHaveBeenCalledWith(mockBrands[1])
    })
})
