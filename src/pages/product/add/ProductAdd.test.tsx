import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/__mocks__/hooks'
import { clearFormData } from '@/features/form/formSlice'
import {
    mockProduct1,
    mockProductCreate,
} from '@/features/products/__mocks__/productsApi'
import { useCreateProductMutation } from '@/features/products/productsApi'
import { ProductAdd } from '@/pages/product/add/ProductAdd'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { mockNavigate } from '@/tests/mocks/router'

vi.mock('@/app/hooks')
vi.mock('@/features/form/formSlice')
vi.mock('@/features/products/components/ProductForm')
vi.mock('@/features/products/productsApi')
vi.mock('@/shared/utils/errorUtils')

describe('ProductAdd', () => {
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
        render(<ProductAdd />)

        expect(screen.getByTestId('mocked-product-form')).toBeInTheDocument()
        expect(screen.getByText('titles.add')).toBeInTheDocument()
    })

    it('calls addProduct and navigates on successful submission', async () => {
        const user = userEvent.setup()

        render(<ProductAdd />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockAddProduct).toHaveBeenCalledWith(mockProduct1)
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

        render(<ProductAdd />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockAddProduct).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        expect(mockDispatch).not.toHaveBeenCalled()
        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
