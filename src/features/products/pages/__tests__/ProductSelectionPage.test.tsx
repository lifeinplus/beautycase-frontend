import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'
import { render, screen } from '@testing-library/react'

import { useAppSelector } from '../../../../app/hooks'
import { mockProducts } from '../../__mocks__/productsApiSlice'
import { useGetProductsQuery } from '../../productsApiSlice'
import { ProductSelectionPage } from '../ProductSelectionPage'
import { mockError } from '../../../../utils/__mocks__/errorUtils'
import userEvent from '@testing-library/user-event'
import { mockNavigate } from '../../../../tests/mocks/router'
import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { setFormData } from '../../../form/formSlice'

vi.mock('../../../../app/hooks')
vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/navigation/NavigationButton')
vi.mock('../../../../components/ui/Image')
vi.mock('../../../../components/TopPanel')
vi.mock('../../../form/formSlice')
vi.mock('../../productsApiSlice')

describe('ProductSelectionPage', () => {
    const mockFormData = {
        productIds: ['product2'],
    }

    beforeEach(() => {
        vi.mocked(useGetProductsQuery as Mock).mockReturnValue({
            data: mockProducts,
            isLoading: false,
            error: null,
        })

        vi.mocked(useAppSelector).mockReturnValue(mockFormData)
    })

    it('renders loading state when data is loading', () => {
        vi.mocked(useGetProductsQuery as Mock).mockReturnValue({
            data: undefined,
            isLoading: true,
            error: null,
        })

        render(<ProductSelectionPage />)

        const loading = screen.getByText('Loading...')
        expect(loading).toBeInTheDocument()
    })

    it('renders error state', () => {
        vi.mocked(useGetProductsQuery as Mock).mockReturnValue({
            data: undefined,
            isLoading: false,
            error: mockError,
        })

        render(<ProductSelectionPage />)

        const error = screen.getByText('Error loading products')
        expect(error).toBeInTheDocument()
    })

    it('renders product items', () => {
        render(<ProductSelectionPage />)

        const product1 = screen.getByAltText('Product 1')
        const product2 = screen.getByAltText('Product 2')

        expect(product1).toBeInTheDocument()
        expect(product2).toBeInTheDocument()
    })

    it('toggles product selection on click', async () => {
        const user = userEvent.setup()

        render(<ProductSelectionPage />)

        const imgContainers = screen
            .getAllByTestId('mocked-image')
            .map((img) => img.parentElement)

        await user.click(imgContainers[0]!)

        const selected = document.querySelectorAll('.img-order-selected')
        expect(selected.length).toBe(2)

        await user.click(imgContainers[1]!)

        const finalSelected = document.querySelectorAll('.img-order-selected')
        expect(finalSelected.length).toBe(1)
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<ProductSelectionPage />)

        const backButton = screen.getByTestId('mocked-back-button')
        await user.click(backButton)

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('saves selection and navigates back when save button is clicked', async () => {
        const user = userEvent.setup()

        render(<ProductSelectionPage />)

        const button = screen.getByTestId('mocked-nav-button-Сохранить')
        await user.click(button)

        expect(mockDispatch).toHaveBeenCalledWith(
            setFormData({
                ...mockFormData,
                productIds: ['product2'],
            })
        )

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('uses an empty array when there is no productId', async () => {
        vi.mocked(useAppSelector).mockReturnValue({ productIds: null })

        render(<ProductSelectionPage />)

        const selected = document.querySelectorAll('.img-order-selected')
        expect(selected.length).toBe(0)
    })
})
