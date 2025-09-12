import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { Brand } from '../../types'
import { BrandsMobileView } from './BrandsMobileView'

vi.mock('@/shared/components/forms/button/Button')

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

        const buttons = screen.getAllByTestId('mocked-button')
        const editBrandA = buttons[0]

        await user.click(editBrandA)

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

        const buttons = screen.getAllByTestId('mocked-button')
        const deleteBrandB = buttons[3]

        await user.click(deleteBrandB)

        expect(mockOnDelete).toHaveBeenCalledTimes(1)
        expect(mockOnDelete).toHaveBeenCalledWith(mockBrands[1])
    })
})
