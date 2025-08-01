import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { clearFormData, setFormData } from '@/features/form/formSlice'
import {
    useDeleteStoreByIdMutation,
    useGetAllStoresQuery,
} from '@/features/stores/storesApi'
import type { Store } from '@/features/stores/types'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { mockNavigate } from '@/tests/mocks/router'
import { Stores } from './Stores'

vi.mock('@/app/hooks')
vi.mock('@/features/form/formSlice')
vi.mock('@/features/stores/components/StoreForm')
vi.mock('@/features/stores/components/StoresMobileView')
vi.mock('@/features/stores/components/StoresTable')
vi.mock('@/features/stores/storesApi')
vi.mock('@/shared/components/modals/ModalDelete')
vi.mock('@/shared/components/navigation/NavBar')
vi.mock('@/shared/components/navigation/NavButton')
vi.mock('@/shared/components/DataWrapper')
vi.mock('@/shared/components/common/Hero')
vi.mock('@/shared/components/layout/TopPanel')
vi.mock('@/shared/utils/errorUtils')

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

        const ids = [
            'mocked-top-panel',
            'mocked-hero',
            'mocked-store-form',
            'mocked-stores-mobile-view',
            'mocked-stores-table',
            'mocked-mobile-store-1',
            'mocked-mobile-store-2',
            'mocked-table-store-1',
            'mocked-table-store-2',
        ]

        ids.forEach((id) => expect(screen.getByTestId(id)).toBeInTheDocument())
    })

    it('should navigate back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<Stores />)

        const backButton = screen.getByTestId('mocked-back-button')
        await user.click(backButton)

        expect(mockNavigate).toHaveBeenCalledWith('/reference-lists')
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
        expect(toast.success).toHaveBeenCalledWith('modal:delete.toast')
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
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })
})
