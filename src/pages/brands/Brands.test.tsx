import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import {
    useDeleteBrandByIdMutation,
    useGetAllBrandsQuery,
} from '@/features/brands/api/brandsApi'
import type { Brand } from '@/features/brands/types'
import { clearFormData, setFormData } from '@/features/form/slice/formSlice'
import { mockError } from '@/shared/utils/error/__mocks__/getErrorMessage'
import { mockNavigate } from '@/tests/mocks/router'
import { Brands } from './Brands'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/brands/api/brandsApi')
vi.mock('@/features/brands/components/form/BrandForm')
vi.mock('@/features/brands/components/mobile-view/BrandsMobileView')
vi.mock('@/features/brands/components/table/BrandsTable')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/shared/components/common/hero/Hero')
vi.mock('@/shared/components/modals/delete/ModalDelete')
vi.mock('@/shared/components/navigation/nav-bar/NavBar')
vi.mock('@/shared/components/navigation/nav-button/NavButton')
vi.mock('@/shared/components/layout/top-panel/TopPanel')
vi.mock('@/shared/utils/error/getErrorMessage')

describe('Brands', () => {
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

    it('renders the page', () => {
        render(<Brands />)

        expect(screen.getByTestId('mocked-top-panel')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-hero')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-brand-form')).toBeInTheDocument()

        expect(
            screen.getByTestId('mocked-brands-mobile-view')
        ).toBeInTheDocument()

        expect(screen.getByTestId('mocked-brands-table')).toBeInTheDocument()

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

        render(<Brands />)
        await user.click(screen.getByTestId('mocked-back-button'))

        expect(mockNavigate).toHaveBeenCalledWith('/reference-lists')
    })

    it('should edit brand when edit button is clicked', async () => {
        const user = userEvent.setup()

        render(<Brands />)
        await user.click(screen.getByTestId('mocked-table-edit-brand1'))

        expect(setFormData).toHaveBeenCalledWith(mockBrands[0])
    })

    it('should delete brand when delete is confirmed', async () => {
        const user = userEvent.setup()

        render(<Brands />)

        await user.click(screen.getByTestId('mocked-table-delete-brand1'))

        const modalDeleteConfirm = screen.getByTestId(
            'mocked-modal-delete-confirm'
        )

        await user.click(modalDeleteConfirm)

        expect(mockDeleteBrandById).toHaveBeenCalledWith('brand1')
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

        render(<Brands />)

        await user.click(screen.getByTestId('mocked-table-delete-brand1'))
        await user.click(screen.getByTestId('mocked-modal-delete-confirm'))

        expect(mockDeleteBrandById).toHaveBeenCalledWith('brand1')
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })
})
