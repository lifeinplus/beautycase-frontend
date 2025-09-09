import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import {
    useDeleteCategoryByIdMutation,
    useGetAllCategoriesQuery,
} from '@/features/categories/categoriesApi'
import type { Category } from '@/features/categories/types'
import { clearFormData, setFormData } from '@/features/form/formSlice'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { mockNavigate } from '@/tests/mocks/router'
import { Categories } from './Categories'

vi.mock('@/app/hooks')
vi.mock('@/features/categories/components/category-form/CategoryForm')
vi.mock(
    '@/features/categories/components/categories-mobile-view/CategoriesMobileView'
)
vi.mock('@/features/categories/components/categories-table/CategoriesTable')
vi.mock('@/features/categories/categoriesApi')
vi.mock('@/features/form/formSlice')
vi.mock('@/shared/components/modals/ModalDelete')
vi.mock('@/shared/components/navigation/NavBar')
vi.mock('@/shared/components/navigation/NavButton')
vi.mock('@/shared/components/layout/TopPanel')
vi.mock('@/shared/components/DataWrapper')
vi.mock('@/shared/components/common/Hero')
vi.mock('@/shared/utils/errorUtils')

describe('Categories', () => {
    const mockCategories: Category[] = [
        { _id: 'category1', name: 'Category A', type: 'Category Type' },
        { _id: 'category2', name: 'Category B', type: 'Category Type' },
    ]

    const mockDeleteCategoryById = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useNavigate).mockReturnValue(mockNavigate)

        vi.mocked(useDeleteCategoryByIdMutation as Mock).mockReturnValue([
            mockDeleteCategoryById,
        ])

        mockDeleteCategoryById.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})

        vi.mocked(useGetAllCategoriesQuery as Mock).mockReturnValue({
            data: mockCategories,
            isLoading: false,
            error: null,
        })
    })

    it('renders the page', () => {
        render(<Categories />)

        expect(screen.getByTestId('mocked-top-panel')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-hero')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-category-form')).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-categories-mobile-view')
        ).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-categories-table')
        ).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-mobile-category-category1')
        ).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-mobile-category-category2')
        ).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-table-category-category1')
        ).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-table-category-category2')
        ).toBeInTheDocument()
    })

    it('should navigate back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<Categories />)
        await user.click(screen.getByTestId('mocked-back-button'))

        expect(mockNavigate).toHaveBeenCalledWith('/reference-lists')
    })

    it('should edit category when edit button is clicked', async () => {
        const user = userEvent.setup()

        render(<Categories />)
        await user.click(screen.getByTestId('mocked-table-edit-category1'))

        expect(setFormData).toHaveBeenCalledWith(mockCategories[0])
    })

    it('should delete category when delete is confirmed', async () => {
        const user = userEvent.setup()

        render(<Categories />)

        await user.click(screen.getByTestId('mocked-table-delete-category1'))

        const modalDeleteConfirm = screen.getByTestId(
            'mocked-modal-delete-confirm'
        )

        await user.click(modalDeleteConfirm)

        expect(mockDeleteCategoryById).toHaveBeenCalledWith('category1')
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

        render(<Categories />)

        await user.click(screen.getByTestId('mocked-table-delete-category1'))
        await user.click(screen.getByTestId('mocked-modal-delete-confirm'))

        expect(mockDeleteCategoryById).toHaveBeenCalledWith('category1')
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })
})
