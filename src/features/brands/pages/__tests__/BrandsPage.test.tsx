import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'
import toast from 'react-hot-toast'

import { mockError } from '../../../../tests/mocks'
import { mockComponents } from '../../../../tests/mocks/components'
import { mockNavigate } from '../../../../tests/mocks/router'
import { clearFormData, setFormData } from '../../../form/formSlice'
import { type BrandsMobileViewProps } from '../../components/BrandsMobileView'
import { type BrandsTableProps } from '../../components/BrandsTable'
import {
    useReadBrandsQuery,
    useDeleteBrandMutation,
} from '../../brandsApiSlice'
import type { Brand } from '../../types'
import { BrandsPage } from '../BrandsPage'

mockComponents()

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
        <div data-testid="mocked-brand-form">Brand Form</div>
    )),
}))

vi.mock('../../components/BrandsMobileView', () => ({
    BrandsMobileView: ({ items }: BrandsMobileViewProps) => (
        <div data-testid="mocked-brands-mobile-view">
            {items?.map((item) => (
                <div
                    key={item._id}
                    data-testid={`mocked-mobile-brand-${item._id}`}
                >
                    {item.name}
                </div>
            ))}
        </div>
    ),
}))

vi.mock('../../components/BrandsTable', () => ({
    BrandsTable: ({ items, onDelete, onEdit }: BrandsTableProps) => (
        <div data-testid="mocked-brands-table">
            {items?.map((item) => (
                <div
                    key={item._id}
                    data-testid={`mocked-table-brand-${item._id}`}
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

describe('BrandsPage', () => {
    const mockBrands: Brand[] = [
        { _id: 'brand1', name: 'Brand A' },
        { _id: 'brand2', name: 'Brand B' },
    ]

    const mockDeleteBrand = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useNavigate).mockReturnValue(mockNavigate)

        vi.mocked(useDeleteBrandMutation as Mock).mockReturnValue([
            mockDeleteBrand,
        ])

        mockDeleteBrand.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})

        vi.mocked(useReadBrandsQuery as Mock).mockReturnValue({
            data: mockBrands,
            isLoading: false,
            error: null,
        })
    })

    it('renders the page title', () => {
        render(<BrandsPage />)

        expect(screen.getByTestId('mocked-top-panel')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-hero')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-brand-form')).toBeInTheDocument()
        expect(
            screen.getByTestId('mocked-brands-mobile-view')
        ).toBeInTheDocument()
        expect(screen.getByTestId('mocked-brands-table')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-nav-bar')).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-mobile-brand-brand1')
        ).toBeInTheDocument()
        expect(
            screen.getByTestId('mocked-mobile-brand-brand2')
        ).toBeInTheDocument()
        expect(
            screen.getByTestId('mocked-table-brand-brand1')
        ).toBeInTheDocument()
        expect(
            screen.getByTestId('mocked-table-brand-brand2')
        ).toBeInTheDocument()
    })

    it('should navigate back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<BrandsPage />)

        const backButton = screen.getByTestId('mocked-back-button')
        await user.click(backButton)

        expect(mockNavigate).toHaveBeenCalledWith('/reference_lists')
    })

    it('should edit brand when edit button is clicked', async () => {
        const user = userEvent.setup()

        render(<BrandsPage />)

        const editButton = screen.getByTestId('mocked-table-edit-brand1')
        await user.click(editButton)

        expect(setFormData).toHaveBeenCalledWith(mockBrands[0])
    })

    it('should delete brand when delete is confirmed', async () => {
        const user = userEvent.setup()

        render(<BrandsPage />)

        const deleteButton = screen.getByTestId('mocked-table-delete-brand1')

        await user.click(deleteButton)

        const modalDeleteButton = screen.getByRole('button', {
            name: 'Modal delete button',
        })

        await user.click(modalDeleteButton)

        expect(mockDeleteBrand).toHaveBeenCalledWith('brand1')
        expect(toast.success).toHaveBeenCalledWith('Бренд удалён')
        expect(clearFormData).toHaveBeenCalled()
        expect(modalDeleteButton).not.toBeInTheDocument()
    })

    it('shows error toast if delete fails', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<BrandsPage />)

        const deleteButton = screen.getByTestId('mocked-table-delete-brand1')

        await user.click(deleteButton)

        const modalDeleteButton = screen.getByRole('button', {
            name: 'Modal delete button',
        })

        await user.click(modalDeleteButton)

        expect(mockDeleteBrand).toHaveBeenCalledWith('brand1')
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })
})
