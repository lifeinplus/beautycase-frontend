import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { Store } from '../../types'
import { StoresTable } from '../StoresTable'

describe('StoresTable', () => {
    const mockStores: Store[] = [
        { _id: '1', name: 'Store A' },
        { _id: '2', name: 'Store B' },
    ]

    const mockOnEdit = vi.fn()
    const mockOnDelete = vi.fn()

    it('renders the table with correct headers', () => {
        render(
            <StoresTable
                items={mockStores}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />
        )

        expect(screen.getByText('Магазин')).toBeInTheDocument()
        expect(screen.getByText('Действия')).toBeInTheDocument()
    })

    it('renders all store items correctly', () => {
        render(
            <StoresTable
                items={mockStores}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />
        )

        expect(screen.getByText('Store A')).toBeInTheDocument()
        expect(screen.getByText('Store B')).toBeInTheDocument()
    })

    it('calls onEdit when edit button is clicked', async () => {
        const user = userEvent.setup()

        render(
            <StoresTable
                items={mockStores}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
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
            <StoresTable
                items={mockStores}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
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
