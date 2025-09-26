import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/hooks/__mocks__/hooks'
import { useAppSelector } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import { mockProducts } from '@/features/products/api/__mocks__/productsApi'
import { useGetAllProductsQuery } from '@/features/products/api/productsApi'
import { mockError } from '@/tests/mocks'
import { mockNavigate } from '@/tests/mocks/router'
import { ProductSelection } from './ProductSelection'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/products/api/productsApi')
vi.mock('@/shared/components/common/title-section/TitleSection')
vi.mock('@/shared/components/layout/top-panel/TopPanel')
vi.mock('@/shared/components/ui/button-submit/ButtonSubmit')
vi.mock('@/shared/components/ui/image/Image')

describe('ProductSelection', () => {
    const mockFormData = {
        productIds: ['product2'],
    }

    const mockOnSave = vi.fn().mockResolvedValue(undefined)

    beforeEach(() => {
        vi.mocked(useGetAllProductsQuery as Mock).mockReturnValue({
            data: mockProducts,
            isLoading: false,
            error: null,
        })

        vi.mocked(useAppSelector).mockReturnValue(mockFormData)
    })

    it('renders loading state when data is loading', () => {
        vi.mocked(useGetAllProductsQuery as Mock).mockReturnValue({
            data: undefined,
            isLoading: true,
            error: null,
        })

        render(<ProductSelection onSave={mockOnSave} />)

        expect(screen.getByText('loading')).toBeInTheDocument()
    })

    it('renders error state', () => {
        vi.mocked(useGetAllProductsQuery as Mock).mockReturnValue({
            data: undefined,
            isLoading: false,
            error: mockError,
        })

        render(<ProductSelection onSave={mockOnSave} />)

        expect(screen.getByText('UNKNOWN_ERROR')).toBeInTheDocument()
    })

    it('renders product items', () => {
        render(<ProductSelection onSave={mockOnSave} />)
        expect(screen.getByAltText('Product 1')).toBeInTheDocument()
        expect(screen.getByAltText('Product 2')).toBeInTheDocument()
    })

    it('toggles product selection on click', async () => {
        const user = userEvent.setup()
        render(<ProductSelection onSave={mockOnSave} />)

        const imgContainers = screen
            .getAllByTestId('mocked-image')
            .map((img) => img.parentElement)

        await user.click(imgContainers[0]!)
        const selected = document.querySelectorAll("[class*='numbered']")
        expect(selected.length).toBe(2)

        await user.click(imgContainers[1]!)
        const finalSelected = document.querySelectorAll("[class*='numbered']")
        expect(finalSelected.length).toBe(1)
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()
        render(<ProductSelection onSave={mockOnSave} />)

        const backButton = screen.getByTestId('mocked-back-button')
        await user.click(backButton)

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('saves selection and navigates back when save button is clicked', async () => {
        const user = userEvent.setup()

        render(<ProductSelection onSave={mockOnSave} />)

        await user.click(screen.getByTestId('mocked-button-submit'))

        expect(mockOnSave).toHaveBeenCalledWith('123', ['product2'])
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('handles errors correctly when save fails', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockOnSave.mockRejectedValue(mockError)

        render(<ProductSelection onSave={mockOnSave} />)

        await user.click(screen.getByTestId('mocked-button-submit'))

        expect(mockOnSave).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')

        mockConsoleError.mockRestore()
    })

    it('does nothing if id is undefined in handleSave', async () => {
        const user = userEvent.setup()

        vi.mocked(useParams).mockReturnValue({})

        render(<ProductSelection onSave={mockOnSave} />)

        await user.click(screen.getByTestId('mocked-button-submit'))

        expect(mockOnSave).not.toHaveBeenCalled()
        expect(mockDispatch).not.toHaveBeenCalled()
        expect(mockNavigate).not.toHaveBeenCalled()
    })

    it('uses an empty array when there is no productId', async () => {
        vi.mocked(useAppSelector).mockReturnValue({ productIds: null })

        render(<ProductSelection onSave={mockOnSave} />)

        const selected = document.querySelectorAll("[class*='numbered']")
        expect(selected.length).toBe(0)
    })

    it('shows saving label when isSaving is true', () => {
        render(<ProductSelection onSave={mockOnSave} isSaving={true} />)

        expect(screen.getByTestId('mocked-button-submit')).toHaveTextContent(
            'navigation:actions.saving'
        )
    })
})
