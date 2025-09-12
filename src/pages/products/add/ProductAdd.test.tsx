import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/hooks/__mocks__/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import {
    mockProduct1,
    mockProductCreate,
} from '@/features/products/api/__mocks__/productsApi'
import { useCreateProductMutation } from '@/features/products/api/productsApi'
import { ProductAdd } from '@/pages/products/add/ProductAdd'
import { mockError } from '@/shared/utils/error/__mocks__/getErrorMessage'
import { mockNavigate } from '@/tests/mocks/router'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/products/components/form/ProductForm')
vi.mock('@/features/products/api/productsApi')
vi.mock('@/shared/utils/error/getErrorMessage')

describe('ProductAdd', () => {
    const mockCreate = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useCreateProductMutation as Mock).mockReturnValue([
            mockCreate,
            { isLoading: false },
        ])

        mockCreate.mockReturnValue({ unwrap: mockUnwrap })
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

        expect(mockCreate).toHaveBeenCalledWith(mockProduct1)
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

        expect(mockCreate).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        expect(mockDispatch).not.toHaveBeenCalled()
        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
