import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { clearFormData, setFormData } from '@/features/form/slice/formSlice'
import {
    useDeleteStoreByIdMutation,
    useGetAllStoresQuery,
} from '@/features/stores/api/storesApi'
import type { Store } from '@/features/stores/types'
import { mockError } from '@/tests/mocks'
import { mockNavigate } from '@/tests/mocks/router'
import { Stores } from './Stores'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/stores/api/storesApi')
vi.mock('@/features/stores/components/form/StoreForm')
vi.mock('@/features/stores/components/mobile-view/StoresMobileView')
vi.mock('@/features/stores/components/table/StoresTable')
vi.mock('@/shared/components/modals/delete/ModalDelete')
vi.mock('@/shared/components/navigation/nav-bar/NavBar')

describe('Stores', () => {
    const mockStores: Store[] = [
        { _id: '1', name: 'Store A' },
        { _id: '2', name: 'Store B' },
    ]

    const mockDeleteStoreById = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useNavigate).mockReturnValue(mockNavigate)

        vi.mocked(useDeleteStoreByIdMutation as Mock).mockReturnValue([
            mockDeleteStoreById,
        ])

        mockDeleteStoreById.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})

        vi.mocked(useGetAllStoresQuery as Mock).mockReturnValue({
            data: mockStores,
            isLoading: false,
            error: null,
        })
    })

    it('renders the page title', () => {
        render(<Stores />)

        expect(screen.getByRole('navigation')).toBeInTheDocument()

        const ids = [
            'mocked-store-form',
            'mocked-stores-mobile-view',
            'mocked-stores-table',
            'mocked-mobile-store-1',
            'mocked-mobile-store-2',
            'mocked-table-store-1',
            'mocked-table-store-2',
        ]

        ids.forEach((id) => expect(screen.getByTestId(id)).toBeInTheDocument())

        expect(screen.getAllByText(/titles.list/)).toHaveLength(2)
    })

    it('should navigate back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<Stores />)

        await user.click(
            screen.getByRole('navigation').querySelector('button')!
        )

        expect(mockNavigate).toHaveBeenCalledWith(
            '/control-center/reference-lists'
        )
    })

    it('should edit store when edit button is clicked', async () => {
        const user = userEvent.setup()

        render(<Stores />)

        const editButton = screen.getByTestId('mocked-table-edit-1')
        await user.click(editButton)

        expect(setFormData).toHaveBeenCalledWith(mockStores[0])
    })

    it('should delete store when delete is confirmed', async () => {
        const user = userEvent.setup()

        render(<Stores />)

        const deleteButton = screen.getByTestId('mocked-table-delete-1')

        await user.click(deleteButton)

        const modalDeleteConfirm = screen.getByTestId(
            'mocked-modal-delete-confirm'
        )

        await user.click(modalDeleteConfirm)

        expect(mockDeleteStoreById).toHaveBeenCalledWith('1')
        expect(clearFormData).toHaveBeenCalled()
        expect(modalDeleteConfirm).not.toBeInTheDocument()
    })

    it('shows error toast if delete fails', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<Stores />)

        const deleteButton = screen.getByTestId('mocked-table-delete-1')

        await user.click(deleteButton)

        const modalDeleteConfirm = screen.getByTestId(
            'mocked-modal-delete-confirm'
        )

        await user.click(modalDeleteConfirm)

        expect(mockDeleteStoreById).toHaveBeenCalledWith('1')
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')

        mockConsoleError.mockRestore()
    })
})
