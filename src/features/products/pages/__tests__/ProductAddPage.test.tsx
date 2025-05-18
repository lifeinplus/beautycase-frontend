import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { mockNavigate } from '../../../../tests/mocks/router'
import { mockError } from '../../../../utils/__mocks__/errorUtils'
import { clearFormData } from '../../../form/formSlice'
import { mockProduct, mockProductCreate } from '../../__mocks__/productsApi'
import { useCreateProductMutation } from '../../productsApi'
import { ProductAddPage } from '../ProductAddPage'

vi.mock('../../../../app/hooks')
vi.mock('../../../../utils/errorUtils')
vi.mock('../../../form/formSlice')
vi.mock('../../components/ProductForm')
vi.mock('../../productsApi')

describe('ProductAddPage', () => {
    const mockAddProduct = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useCreateProductMutation as Mock).mockReturnValue([
            mockAddProduct,
        ])

        mockAddProduct.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue(mockProductCreate)
    })

    it('renders the ProductForm with correct title', () => {
        render(<ProductAddPage />)

        const form = screen.getByTestId('mocked-product-form')
        const title = screen.getByText('Добавить продукт')

        expect(form).toBeInTheDocument()
        expect(title).toBeInTheDocument()
    })

    it('calls addProduct and navigates on successful submission', async () => {
        const user = userEvent.setup()

        render(<ProductAddPage />)

        const button = screen.getByTestId('mocked-submit-button')
        await user.click(button)

        expect(mockAddProduct).toHaveBeenCalledWith(mockProduct)
        expect(mockUnwrap).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
        expect(mockNavigate).toHaveBeenCalledWith('/products/product3')
    })

    it('displays an error toast if submission fails', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<ProductAddPage />)

        const button = screen.getByTestId('mocked-submit-button')
        await user.click(button)

        expect(mockAddProduct).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        expect(mockDispatch).not.toHaveBeenCalled()
        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
