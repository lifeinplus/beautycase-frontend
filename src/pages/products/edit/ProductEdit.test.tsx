import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/hooks/__mocks__/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import { mockProduct1 } from '@/features/products/api/__mocks__/productsApi'
import {
    useGetProductByIdQuery,
    useUpdateProductByIdMutation,
} from '@/features/products/api/productsApi'
import { ROUTES } from '@/shared/config/routes'
import { mockError } from '@/tests/mocks'
import { mockNavigate } from '@/tests/mocks/router'
import { ProductEdit } from './ProductEdit'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/products/api/productsApi')
vi.mock('@/features/products/components/form/ProductForm')

describe('ProductEdit', () => {
    const mockUpdate = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useUpdateProductByIdMutation as Mock).mockReturnValue([
            mockUpdate,
            { isLoading: false },
        ])

        mockUpdate.mockReturnValue({ unwrap: mockUnwrap })
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

        expect(mockUpdate).toHaveBeenCalledWith({
            id: '123',
            product: mockProduct1,
        })

        expect(mockUnwrap).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
        expect(mockNavigate).toHaveBeenCalledWith(
            ROUTES.backstage.products.details('123')
        )
    })

    it('shows error toast on failure', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<ProductEdit />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdate).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')

        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
