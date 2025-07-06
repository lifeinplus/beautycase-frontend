import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import {
    useDeleteBrandByIdMutation,
    useGetAllBrandsQuery,
} from '@/features/brands/brandsApi'
import type { Brand } from '@/features/brands/types'
import { clearFormData, setFormData } from '@/features/form/formSlice'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { mockNavigate } from '@/tests/mocks/router'
import { BrandsPage } from '../BrandsPage'

vi.mock('@/app/hooks')
vi.mock('@/features/brands/components/BrandForm')
vi.mock('@/features/brands/components/BrandsMobileView')
vi.mock('@/features/brands/components/BrandsTable')
vi.mock('@/features/brands/brandsApi')
vi.mock('@/features/form/formSlice')
vi.mock('@/shared/components/modals/ModalDelete')
vi.mock('@/shared/components/navigation/NavBar')
vi.mock('@/shared/components/navigation/NavButton')
vi.mock('@/shared/components/layout/TopPanel')
vi.mock('@/shared/components/DataWrapper')
vi.mock('@/shared/components/common/Hero')
vi.mock('@/shared/utils/errorUtils')

describe('BrandsPage', () => {
    const mockBrands: Brand[] = [
        { _id: 'brand1', name: 'Brand A' },
        { _id: 'brand2', name: 'Brand B' },
    ]

    const mockDeleteBrandById = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useNavigate).mockReturnValue(mockNavigate)

        vi.mocked(useDeleteBrandByIdMutation as Mock).mockReturnValue([
            mockDeleteBrandById,
        ])

        mockDeleteBrandById.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})

        vi.mocked(useGetAllBrandsQuery as Mock).mockReturnValue({
            data: mockBrands,
            isLoading: false,
            error: null,
        })
    })

    it('renders the page title', () => {
        render(<BrandsPage />)

        const topPanel = screen.getByTestId('mocked-top-panel')
        const hero = screen.getByTestId('mocked-hero')
        const brandForm = screen.getByTestId('mocked-brand-form')
        const brandsMobileView = screen.getByTestId('mocked-brands-mobile-view')
        const brandsTable = screen.getByTestId('mocked-brands-table')
        const navBar = screen.getByTestId('mocked-nav-bar')

        expect(topPanel).toBeInTheDocument()
        expect(hero).toBeInTheDocument()
        expect(brandForm).toBeInTheDocument()
        expect(brandsMobileView).toBeInTheDocument()
        expect(brandsTable).toBeInTheDocument()
        expect(navBar).toBeInTheDocument()

        const mobileBrand1 = screen.getByTestId('mocked-mobile-brand-brand1')
        const mobilebBand2 = screen.getByTestId('mocked-mobile-brand-brand2')
        const tableBrand1 = screen.getByTestId('mocked-table-brand-brand1')
        const tableBrand2 = screen.getByTestId('mocked-table-brand-brand2')

        expect(mobileBrand1).toBeInTheDocument()
        expect(mobilebBand2).toBeInTheDocument()
        expect(tableBrand1).toBeInTheDocument()
        expect(tableBrand2).toBeInTheDocument()
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

        const modalDeleteConfirm = screen.getByTestId(
            'mocked-modal-delete-confirm'
        )

        await user.click(modalDeleteConfirm)

        expect(mockDeleteBrandById).toHaveBeenCalledWith('brand1')
        expect(toast.success).toHaveBeenCalledWith('toast.delete')
        expect(clearFormData).toHaveBeenCalled()
        expect(modalDeleteConfirm).not.toBeInTheDocument()
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

        const modalDeleteConfirm = screen.getByTestId(
            'mocked-modal-delete-confirm'
        )

        await user.click(modalDeleteConfirm)

        expect(mockDeleteBrandById).toHaveBeenCalledWith('brand1')
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })
})
