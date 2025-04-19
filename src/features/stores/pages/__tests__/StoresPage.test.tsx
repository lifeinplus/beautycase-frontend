import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router-dom'
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'
import toast from 'react-hot-toast'

import { mockError } from '../../../../tests/mocks'
import { mockNavigate } from '../../../../tests/mocks/router'
import { clearFormData, setFormData } from '../../../form/formSlice'
import {
    useReadStoresQuery,
    useDeleteStoreMutation,
} from '../../storesApiSlice'
import type { Store } from '../../types'
import { StoresPage } from '../StoresPage'

vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/Hero')
vi.mock('../../../../components/TopPanel')

vi.mock('../../../../utils/errorUtils', () => ({
    getErrorMessage: vi.fn((error) => error.message),
}))

vi.mock('../../../form/formSlice', async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...(actual as object),
        clearFormData: vi.fn(),
        setFormData: vi.fn(),
    }
})

vi.mock('../../storesApiSlice', () => ({
    useDeleteStoreMutation: vi.fn(),
    useReadStoresQuery: vi.fn(),
}))

vi.mock('../../components/StoreForm')
vi.mock('../../components/StoresMobileView')
vi.mock('../../components/StoresTable')

describe('StoresPage', () => {
    const mockStores: Store[] = [
        { _id: '1', name: 'Store A' },
        { _id: '2', name: 'Store B' },
    ]

    const mockDeleteStore = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useNavigate).mockReturnValue(mockNavigate)

        vi.mocked(useDeleteStoreMutation as Mock).mockReturnValue([
            mockDeleteStore,
        ])

        mockDeleteStore.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})

        vi.mocked(useReadStoresQuery as Mock).mockReturnValue({
            data: mockStores,
            isLoading: false,
            error: null,
        })
    })

    it('renders the page title', () => {
        render(<StoresPage />)

        expect(screen.getByTestId('mocked-top-panel')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-hero')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-store-form')).toBeInTheDocument()
        expect(
            screen.getByTestId('mocked-stores-mobile-view')
        ).toBeInTheDocument()
        expect(screen.getByTestId('mocked-stores-table')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-nav-bar')).toBeInTheDocument()

        expect(screen.getByTestId('mocked-mobile-store-1')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-mobile-store-2')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-table-store-1')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-table-store-2')).toBeInTheDocument()
    })

    it('should navigate back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<StoresPage />)

        const backButton = screen.getByTestId('mocked-back-button')
        await user.click(backButton)

        expect(mockNavigate).toHaveBeenCalledWith('/reference_lists')
    })

    it('should edit store when edit button is clicked', async () => {
        const user = userEvent.setup()

        render(<StoresPage />)

        const editButton = screen.getByTestId('mocked-table-edit-1')
        await user.click(editButton)

        expect(setFormData).toHaveBeenCalledWith(mockStores[0])
    })

    it('should delete store when delete is confirmed', async () => {
        const user = userEvent.setup()

        render(<StoresPage />)

        const deleteButton = screen.getByTestId('mocked-table-delete-1')

        await user.click(deleteButton)

        const modalDeleteButton = screen.getByRole('button', {
            name: 'Modal delete button',
        })

        await user.click(modalDeleteButton)

        expect(mockDeleteStore).toHaveBeenCalledWith('1')
        expect(toast.success).toHaveBeenCalledWith('Магазин удалён')
        expect(clearFormData).toHaveBeenCalled()
        expect(modalDeleteButton).not.toBeInTheDocument()
    })

    it('shows error toast if delete fails', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<StoresPage />)

        const deleteButton = screen.getByTestId('mocked-table-delete-1')

        await user.click(deleteButton)

        const modalDeleteButton = screen.getByRole('button', {
            name: 'Modal delete button',
        })

        await user.click(modalDeleteButton)

        expect(mockDeleteStore).toHaveBeenCalledWith('1')
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })
})
