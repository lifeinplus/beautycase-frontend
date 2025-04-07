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
    useReadBrandsQuery,
    useDeleteBrandMutation,
} from '../../brandsApiSlice'
import { type BrandsMobileViewProps } from '../../components/BrandsMobileView'
import { type BrandsTableProps } from '../../components/BrandsTable'
import type { Brand } from '../../types'
import { BrandsPage } from '../BrandsPage'

vi.mock('../../../../components/DataWrapper', () => ({
    DataWrapper: ({ children }: DataWrapperProps<Brand>) => (
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

vi.mock('../../brandsApiSlice', () => ({
    useDeleteBrandMutation: vi.fn(),
    useReadBrandsQuery: vi.fn(),
}))

vi.mock('../../components/BrandForm', () => ({
    BrandForm: forwardRef(({}, _) => (
        <div data-testid="brand-form">Brand Form</div>
    )),
}))

vi.mock('../../components/BrandsMobileView', () => ({
    BrandsMobileView: ({ items }: BrandsMobileViewProps) => (
        <div data-testid="brands-mobile-view">
            {items?.map((item) => (
                <div key={item._id} data-testid={`mobile-brand-${item._id}`}>
                    {item.name}
                </div>
            ))}
        </div>
    ),
}))

vi.mock('../../components/BrandsTable', () => ({
    BrandsTable: ({ items, onDelete, onEdit }: BrandsTableProps) => (
        <div data-testid="brands-table">
            {items?.map((item) => (
                <div key={item._id} data-testid={`table-brand-${item._id}`}>
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

describe('BrandsPage', () => {
    const mockBrands: Brand[] = [
        { _id: '1', name: 'Brand A' },
        { _id: '2', name: 'Brand B' },
    ]

    const mockDeleteBrand = vi.fn(() => ({
        unwrap: () => Promise.resolve({}),
    }))

    beforeEach(() => {
        vi.mocked(useAppDispatch).mockReturnValue(mockDispatch)

        vi.mocked(useNavigate).mockReturnValue(mockNavigate)

        vi.mocked(useDeleteBrandMutation as Mock).mockReturnValue([
            mockDeleteBrand,
        ])

        vi.mocked(useReadBrandsQuery as Mock).mockReturnValue({
            data: mockBrands,
            isLoading: false,
            error: null,
        })
    })

    it('renders the page title', () => {
        render(<BrandsPage />)

        expect(screen.getByTestId('top-panel')).toBeInTheDocument()
        expect(screen.getByTestId('hero')).toBeInTheDocument()
        expect(screen.getByTestId('brand-form')).toBeInTheDocument()
        expect(screen.getByTestId('brands-mobile-view')).toBeInTheDocument()
        expect(screen.getByTestId('brands-table')).toBeInTheDocument()
        expect(screen.getByTestId('adaptive-navbar')).toBeInTheDocument()

        expect(screen.getByTestId('mobile-brand-1')).toBeInTheDocument()
        expect(screen.getByTestId('mobile-brand-2')).toBeInTheDocument()
        expect(screen.getByTestId('table-brand-1')).toBeInTheDocument()
        expect(screen.getByTestId('table-brand-2')).toBeInTheDocument()
    })

    it('should navigate back when back button is clicked', async () => {
        render(<BrandsPage />)

        const backButton = screen.getByTestId('back-button')
        await userEvent.click(backButton)

        expect(mockNavigate).toHaveBeenCalledWith('/reference_lists')
    })

    it('should edit brand when edit button is clicked', async () => {
        render(<BrandsPage />)

        const editButton = screen.getByTestId('table-edit-1')
        await userEvent.click(editButton)

        expect(setFormData).toHaveBeenCalledWith(mockBrands[0])
    })

    it('should delete brand when delete is confirmed', async () => {
        const user = userEvent.setup()

        render(<BrandsPage />)

        const deleteButton = screen.getByTestId('table-delete-1')

        await user.click(deleteButton)

        const modalDeleteButton = screen.getByRole('button', {
            name: 'Modal delete button',
        })

        await user.click(modalDeleteButton)

        expect(mockDeleteBrand).toHaveBeenCalledWith('1')
        expect(toast.success).toHaveBeenCalledWith('Бренд удалён')
        expect(clearFormData).toHaveBeenCalled()
        expect(modalDeleteButton).not.toBeInTheDocument()
    })

    it('shows error toast if delete fails', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        const mockError = new Error('Delete failed')

        const mockDeleteBrand = vi.fn(() => ({
            unwrap: () => Promise.reject(mockError),
        }))

        vi.mocked(useDeleteBrandMutation as Mock).mockReturnValue([
            mockDeleteBrand,
        ])

        render(<BrandsPage />)

        const deleteButton = screen.getByTestId('table-delete-1')

        await user.click(deleteButton)

        const modalDeleteButton = screen.getByRole('button', {
            name: 'Modal delete button',
        })

        await user.click(modalDeleteButton)

        expect(mockDeleteBrand).toHaveBeenCalledWith('1')
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })
})
