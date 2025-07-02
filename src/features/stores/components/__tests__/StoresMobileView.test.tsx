import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, vi, expect, it } from 'vitest'

import type { Store } from '../../types'
import { StoresMobileView } from '../StoresMobileView'

vi.mock('../../../form/components/Button')

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

        const editButtons = screen.getAllByTestId('mocked-button')
        const editStoreA = editButtons[0]

        await user.click(editStoreA)

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

        const deleteButtons = screen.getAllByTestId('mocked-button')
        const deleteStoreB = deleteButtons[3]

        await user.click(deleteStoreB)

        expect(mockOnDelete).toHaveBeenCalledTimes(1)
        expect(mockOnDelete).toHaveBeenCalledWith(mockStores[1])
    })
})
