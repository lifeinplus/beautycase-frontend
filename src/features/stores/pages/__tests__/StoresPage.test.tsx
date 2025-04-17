import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'
import toast from 'react-hot-toast'

import { type AdaptiveNavBarProps } from '../../../../components/navigation/AdaptiveNavBar'
import { type DataWrapperProps } from '../../../../components/DataWrapper'
import { type HeroProps } from '../../../../components/Hero'
import { type TopPanelProps } from '../../../../components/TopPanel'
import { mockError } from '../../../../tests/mocks'
import { mockNavigate } from '../../../../tests/mocks/router'
import { clearFormData, setFormData } from '../../../form/formSlice'
import { type StoresMobileViewProps } from '../../components/StoresMobileView'
import { type StoresTableProps } from '../../components/StoresTable'
import {
    useReadStoresQuery,
    useDeleteStoreMutation,
} from '../../storesApiSlice'
import type { Store } from '../../types'
import { StoresPage } from '../StoresPage'

vi.mock('../../../../components/DataWrapper', () => ({
    DataWrapper: ({ children }: DataWrapperProps<Store>) => (
        <div data-testid="mocked-data-wrapper">{children}</div>
    ),
}))

vi.mock('../../../../components/Hero', () => ({
    Hero: ({ headline }: HeroProps) => (
        <div data-testid="mocked-hero">{headline}</div>
    ),
}))

vi.mock('../../../../components/TopPanel', () => ({
    TopPanel: ({ title, onBack }: TopPanelProps) => (
        <div data-testid="mocked-top-panel">
            <button data-testid="mocked-back-button" onClick={onBack}>
                Back
            </button>
            <h2>{title}</h2>
        </div>
    ),
}))

vi.mock('../../../../components/navigation/AdaptiveNavBar', () => ({
    AdaptiveNavBar: ({ children }: AdaptiveNavBarProps) => (
        <div data-testid="mocked-adaptive-navbar">{children}</div>
    ),
}))

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

vi.mock('../../components/StoreForm', () => ({
    StoreForm: forwardRef(({}, _) => (
        <div data-testid="mocked-store-form">Store Form</div>
    )),
}))

vi.mock('../../components/StoresMobileView', () => ({
    StoresMobileView: ({ items }: StoresMobileViewProps) => (
        <div data-testid="mocked-stores-mobile-view">
            {items?.map((item) => (
                <div
                    key={item._id}
                    data-testid={`mocked-mobile-store-${item._id}`}
                >
                    {item.name}
                </div>
            ))}
        </div>
    ),
}))

vi.mock('../../components/StoresTable', () => ({
    StoresTable: ({ items, onDelete, onEdit }: StoresTableProps) => (
        <div data-testid="mocked-stores-table">
            {items?.map((item) => (
                <div
                    key={item._id}
                    data-testid={`mocked-table-store-${item._id}`}
                >
                    <span>{item.name}</span>
                    <button
                        data-testid={`mocked-table-edit-${item._id}`}
                        onClick={() => onEdit(item)}
                    >
                        Edit
                    </button>
                    <button
                        data-testid={`mocked-table-delete-${item._id}`}
                        onClick={() => onDelete(item)}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    ),
}))

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
        expect(screen.getByTestId('mocked-adaptive-navbar')).toBeInTheDocument()

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
