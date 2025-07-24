import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/__mocks__/hooks'
import { clearFormData } from '@/features/form/formSlice'
import { mockProduct1 } from '@/features/products/__mocks__/productsApi'
import {
    useGetProductByIdQuery,
    useUpdateProductByIdMutation,
} from '@/features/products/productsApi'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { mockNavigate } from '@/tests/mocks/router'
import { ProductEdit } from './ProductEdit'

vi.mock('@/app/hooks')
vi.mock('@/features/form/formSlice')
vi.mock('@/features/products/productsApi')
vi.mock('@/features/products/components/ProductForm')
vi.mock('@/shared/utils/errorUtils')

describe('ProductEdit', () => {
    const mockUpdateProductById = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useUpdateProductByIdMutation as Mock).mockReturnValue([
            mockUpdateProductById,
        ])

        mockUpdateProductById.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})

        vi.mocked(useGetProductByIdQuery as Mock).mockReturnValue({
            data: mockProduct1,
        })
    })

    it('renders the ProductForm with title', () => {
        render(<ProductEdit />)

        expect(screen.getByTestId('mocked-product-form')).toBeInTheDocument()
        expect(screen.getByText('titles.edit')).toBeInTheDocument()
    })

    it('handles form submission successfully', async () => {
        const user = userEvent.setup()

        render(<ProductEdit />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdateProductById).toHaveBeenCalledWith({
            id: '123',
            product: mockProduct1,
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

        render(<ProductEdit />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdateProductById).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
