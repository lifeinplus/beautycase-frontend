import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'
import toast from 'react-hot-toast'

import { useAppDispatch } from '../../../../app/hooks'
import { type DataWrapperProps } from '../../../../components/DataWrapper'
import { type HeroProps } from '../../../../components/Hero'
import { type TopPanelProps } from '../../../../components/TopPanel'
import { type AdaptiveNavBarProps } from '../../../../components/navigation/AdaptiveNavBar'
import { mockDispatch } from '../../../../tests/mocks/app'
import { mockNavigate } from '../../../../tests/mocks/router'

import { clearFormData, setFormData } from '../../../form/formSlice'

import {
    useReadStoresQuery,
    useDeleteStoreMutation,
} from '../../storesApiSlice'
import { type StoresMobileViewProps } from '../../components/StoresMobileView'
import { type StoresTableProps } from '../../components/StoresTable'
import type { Store } from '../../types'

import { StoresPage } from '../StoresPage'

vi.mock('../../../../app/hooks', () => ({
    useAppDispatch: vi.fn(),
    useAppSelector: vi.fn(),
}))

vi.mock('../../../../components/DataWrapper', () => ({
    DataWrapper: ({ children }: DataWrapperProps<Store>) => (
        <div data-testid="data-wrapper">{children}</div>
    ),
}))

vi.mock('../../../../components/Hero', () => ({
    Hero: ({ headline }: HeroProps) => <div data-testid="hero">{headline}</div>,
}))

vi.mock('../../../../components/TopPanel', () => ({
    TopPanel: ({ title, onBack }: TopPanelProps) => (
        <div data-testid="top-panel">
            <button data-testid="back-button" onClick={onBack}>
                Back
            </button>
            <h2>{title}</h2>
        </div>
    ),
}))

vi.mock('../../../../components/navigation/AdaptiveNavBar', () => ({
    AdaptiveNavBar: ({ children }: AdaptiveNavBarProps) => (
        <div data-testid="adaptive-navbar">{children}</div>
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
        <div data-testid="store-form">Store Form</div>
    )),
}))

vi.mock('../../components/StoresMobileView', () => ({
    StoresMobileView: ({ items }: StoresMobileViewProps) => (
        <div data-testid="stores-mobile-view">
            {items?.map((item) => (
                <div key={item._id} data-testid={`mobile-store-${item._id}`}>
                    {item.name}
                </div>
            ))}
        </div>
    ),
}))

vi.mock('../../components/StoresTable', () => ({
    StoresTable: ({ items, onDelete, onEdit }: StoresTableProps) => (
        <div data-testid="stores-table">
            {items?.map((item) => (
                <div key={item._id} data-testid={`table-store-${item._id}`}>
                    <span>{item.name}</span>
                    <button
                        data-testid={`table-edit-${item._id}`}
                        onClick={() => onEdit(item)}
                    >
                        Edit
                    </button>
                    <button
                        data-testid={`table-delete-${item._id}`}
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

    const mockDeleteStore = vi.fn(() => ({
        unwrap: () => Promise.resolve({}),
    }))

    beforeEach(() => {
        vi.mocked(useAppDispatch).mockReturnValue(mockDispatch)

        vi.mocked(useNavigate).mockReturnValue(mockNavigate)

        vi.mocked(useDeleteStoreMutation as Mock).mockReturnValue([
            mockDeleteStore,
        ])

        vi.mocked(useReadStoresQuery as Mock).mockReturnValue({
            data: mockStores,
            isLoading: false,
            error: null,
        })
    })

    it('renders the page title', () => {
        render(<StoresPage />)

        expect(screen.getByTestId('top-panel')).toBeInTheDocument()
        expect(screen.getByTestId('hero')).toBeInTheDocument()
        expect(screen.getByTestId('store-form')).toBeInTheDocument()
        expect(screen.getByTestId('stores-mobile-view')).toBeInTheDocument()
        expect(screen.getByTestId('stores-table')).toBeInTheDocument()
        expect(screen.getByTestId('adaptive-navbar')).toBeInTheDocument()

        expect(screen.getByTestId('mobile-store-1')).toBeInTheDocument()
        expect(screen.getByTestId('mobile-store-2')).toBeInTheDocument()
        expect(screen.getByTestId('table-store-1')).toBeInTheDocument()
        expect(screen.getByTestId('table-store-2')).toBeInTheDocument()
    })

    it('should navigate back when back button is clicked', async () => {
        render(<StoresPage />)

        const backButton = screen.getByTestId('back-button')
        await userEvent.click(backButton)

        expect(mockNavigate).toHaveBeenCalledWith('/reference_lists')
    })

    it('should edit store when edit button is clicked', async () => {
        render(<StoresPage />)

        const editButton = screen.getByTestId('table-edit-1')
        await userEvent.click(editButton)

        expect(setFormData).toHaveBeenCalledWith(mockStores[0])
    })

    it('should delete store when delete is confirmed', async () => {
        const user = userEvent.setup()

        render(<StoresPage />)

        const deleteButton = screen.getByTestId('table-delete-1')

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

        const mockError = new Error('Delete failed')

        const mockDeleteStore = vi.fn(() => ({
            unwrap: () => Promise.reject(mockError),
        }))

        vi.mocked(useDeleteStoreMutation as Mock).mockReturnValue([
            mockDeleteStore,
        ])

        render(<StoresPage />)

        const deleteButton = screen.getByTestId('table-delete-1')

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
