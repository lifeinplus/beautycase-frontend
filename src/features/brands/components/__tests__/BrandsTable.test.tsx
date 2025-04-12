import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { Brand } from '../../types'
import { BrandsTable } from '../BrandsTable'

describe('BrandsTable', () => {
    const mockBrands: Brand[] = [
        { _id: '1', name: 'Brand A' },
        { _id: '2', name: 'Brand B' },
    ]

    const mockOnEdit = vi.fn()
    const mockOnDelete = vi.fn()

    it('renders the table with correct headers', () => {
        render(
            <BrandsTable
                items={mockBrands}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />
        )

        expect(screen.getByText('Бренд')).toBeInTheDocument()
        expect(screen.getByText('Действия')).toBeInTheDocument()
    })

    it('renders all brand items correctly', () => {
        render(
            <BrandsTable
                items={mockBrands}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />
        )

        expect(screen.getByText('Brand A')).toBeInTheDocument()
        expect(screen.getByText('Brand B')).toBeInTheDocument()
    })

    it('calls onEdit when edit button is clicked', async () => {
        const user = userEvent.setup()

        render(
            <BrandsTable
                items={mockBrands}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />
        )

        const editButtons = screen.getAllByRole('button', {
            name: /edit/i,
        })

        const editBrandA = editButtons[0]
        await user.click(editBrandA)

        expect(mockOnEdit).toHaveBeenCalledTimes(1)
        expect(mockOnEdit).toHaveBeenCalledWith(mockBrands[0])
    })

    it('calls onDelete when delete button is clicked', async () => {
        const user = userEvent.setup()

        render(
            <BrandsTable
                items={mockBrands}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />
        )

        const deleteButtons = screen.getAllByRole('button', {
            name: /delete/i,
        })

        const deleteBrandB = deleteButtons[1]
        await user.click(deleteBrandB)

        expect(mockOnDelete).toHaveBeenCalledTimes(1)
        expect(mockOnDelete).toHaveBeenCalledWith(mockBrands[1])
    })
})
