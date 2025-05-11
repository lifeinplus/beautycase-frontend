import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, it, vi, expect, beforeEach, Mock } from 'vitest'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { mockNavigate } from '../../../../tests/mocks/router'
import { mockError } from '../../../../utils/__mocks__/errorUtils'
import { clearFormData } from '../../../form/formSlice'
import { mockProduct } from '../../__mocks__/productsApi'
import {
    useUpdateProductMutation,
    useReadProductQuery,
} from '../../productsApi'
import { ProductEditPage } from '../ProductEditPage'

vi.mock('../../../../app/hooks')
vi.mock('../../../../utils/errorUtils')
vi.mock('../../../form/formSlice')
vi.mock('../../components/ProductForm')
vi.mock('../../productsApi')

describe('ProductEditPage', () => {
    const mockEditProduct = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useUpdateProductMutation as Mock).mockReturnValue([
            mockEditProduct,
        ])

        mockEditProduct.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})

        vi.mocked(useReadProductQuery as Mock).mockReturnValue({
            data: mockProduct,
        })
    })

    it('renders the ProductForm with title', () => {
        render(<ProductEditPage />)

        const form = screen.getByTestId('mocked-product-form')
        const title = screen.getByText('Редактировать продукт')

        expect(form).toBeInTheDocument()
        expect(title).toBeInTheDocument()
    })

    it('handles form submission successfully', async () => {
        const user = userEvent.setup()

        render(<ProductEditPage />)

        const button = screen.getByTestId('mocked-submit-button')
        await user.click(button)

        expect(mockEditProduct).toHaveBeenCalledWith({
            id: '123',
            body: mockProduct,
        })

        expect(mockUnwrap).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
        expect(mockNavigate).toHaveBeenCalledWith('/products/123')
    })

    it('shows error toast on failure', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<ProductEditPage />)

        const button = screen.getByTestId('mocked-submit-button')
        await user.click(button)

        expect(mockEditProduct).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
