import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, vi, expect, it } from 'vitest'

import type { Store } from '../../types'
import { StoresMobileView } from '../StoresMobileView'

describe('StoresMobileView', () => {
    const mockStores: Store[] = [
        { _id: '1', name: 'Store A' },
        { _id: '2', name: 'Store B' },
    ]

    const mockOnDelete = vi.fn()
    const mockOnEdit = vi.fn()

    it('renders stores correctly', () => {
        render(
            <StoresMobileView
                items={mockStores}
                onDelete={mockOnDelete}
                onEdit={mockOnEdit}
            />
        )

        expect(screen.getByText('Store A')).toBeInTheDocument()
        expect(screen.getByText('Store B')).toBeInTheDocument()
    })

    it('calls onEdit when edit button is clicked', async () => {
        const user = userEvent.setup()

        render(
            <StoresMobileView
                items={mockStores}
                onDelete={mockOnDelete}
                onEdit={mockOnEdit}
            />
        )

        const editButtons = screen.getAllByRole('button', {
            name: /edit/i,
        })

        await user.click(editButtons[0])

        expect(mockOnEdit).toHaveBeenCalledTimes(1)
        expect(mockOnEdit).toHaveBeenCalledWith(mockStores[0])
    })

    it('calls onDelete when delete button is clicked', async () => {
        const user = userEvent.setup()

        render(
            <StoresMobileView
                items={mockStores}
                onDelete={mockOnDelete}
                onEdit={mockOnEdit}
            />
        )

        const deleteButtons = screen.getAllByRole('button', {
            name: /delete/i,
        })

        await user.click(deleteButtons[1])

        expect(mockOnDelete).toHaveBeenCalledTimes(1)
        expect(mockOnDelete).toHaveBeenCalledWith(mockStores[1])
    })
})
