import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router-dom'
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'
import toast from 'react-hot-toast'

import { mockNavigate } from '../../../../tests/mocks/router'
import { mockError } from '../../../../utils/__mocks__/errorUtils'
import { clearFormData, setFormData } from '../../../form/formSlice'
import { useReadBrandsQuery, useDeleteBrandMutation } from '../../brandsApi'
import type { Brand } from '../../types'
import { BrandsPage } from '../BrandsPage'

vi.mock('../../../../app/hooks')
vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/navigation/NavigationButton')
vi.mock('../../../../components/ui/ModalDelete')
vi.mock('../../../../components/DataWrapper')
vi.mock('../../../../components/Hero')
vi.mock('../../../../components/TopPanel')
vi.mock('../../../../utils/errorUtils')
vi.mock('../../../form/formSlice')
vi.mock('../../components/BrandForm')
vi.mock('../../components/BrandsMobileView')
vi.mock('../../components/BrandsTable')
vi.mock('../../brandsApi')

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

        expect(mockDeleteBrand).toHaveBeenCalledWith('brand1')
        expect(toast.success).toHaveBeenCalledWith('Бренд удалён')
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

        expect(mockDeleteBrand).toHaveBeenCalledWith('brand1')
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })
})
