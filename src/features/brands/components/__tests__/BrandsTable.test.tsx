import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { Brand } from '../../types'
import { BrandsTable } from '../BrandsTable'

vi.mock('../../../../components/table/Table')
vi.mock('../../../../components/table/TableRow')
vi.mock('../../../../components/ui/Button')

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

        expect(screen.getByText('table.brandName')).toBeInTheDocument()
        expect(screen.getByText('table.actions')).toBeInTheDocument()
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

        const buttons = screen.getAllByTestId('mocked-button')
        const editBrandA = buttons[0]

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

        const buttons = screen.getAllByTestId('mocked-button')
        const deleteBrandB = buttons[3]

        await user.click(deleteBrandB)

        expect(mockOnDelete).toHaveBeenCalledTimes(1)
        expect(mockOnDelete).toHaveBeenCalledWith(mockBrands[1])
    })
})
