import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { useAppSelector } from '../../../../app/hooks'
import { mockNavigate } from '../../../../tests/mocks/router'
import { mockError } from '../../../../shared/utils/__mocks__/errorUtils'
import { setFormData } from '../../../form/formSlice'
import { mockProducts } from '../../__mocks__/productsApi'
import { useGetAllProductsQuery } from '../../productsApi'
import { ProductSelectionPage } from '../ProductSelectionPage'

vi.mock('../../../../app/hooks')
vi.mock('../../../../shared/components/layout/TopPanel')
vi.mock('../../../../shared/components/navigation/NavBar')
vi.mock('../../../../shared/components/navigation/NavButton')
vi.mock('../../../../shared/components/ui/Image')
vi.mock('../../../form/formSlice')
vi.mock('../../productsApi')

describe('ProductSelectionPage', () => {
    const mockFormData = {
        productIds: ['product2'],
    }

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

        render(<ProductSelectionPage />)

        expect(screen.getByText('loading')).toBeInTheDocument()
    })

    it('renders error state', () => {
        vi.mocked(useGetAllProductsQuery as Mock).mockReturnValue({
            data: undefined,
            isLoading: false,
            error: mockError,
        })

        render(<ProductSelectionPage />)

        expect(screen.getByText('emptyMessageList')).toBeInTheDocument()
    })

    it('renders product items', () => {
        render(<ProductSelectionPage />)
        expect(screen.getByAltText('Product 1')).toBeInTheDocument()
        expect(screen.getByAltText('Product 2')).toBeInTheDocument()
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

        await user.click(
            screen.getByTestId('mocked-nav-button-navigation:actions.save')
        )

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
