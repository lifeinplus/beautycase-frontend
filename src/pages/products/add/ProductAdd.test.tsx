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
import { ROUTES } from '@/shared/config/routes'
import { mockError } from '@/tests/mocks'
import { mockNavigate } from '@/tests/mocks/router'
import { spyConsoleError } from '@/tests/setup'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/products/components/form/ProductForm')
vi.mock('@/features/products/api/productsApi')

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
        expect(mockNavigate).toHaveBeenCalledWith(
            ROUTES.backstage.products.details('product3')
        )
    })

    it('displays an error toast if submission fails', async () => {
        const user = userEvent.setup()

        mockUnwrap.mockRejectedValue(mockError)

        render(<ProductAdd />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockCreate).toHaveBeenCalled()
        expect(spyConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')

        expect(mockDispatch).not.toHaveBeenCalled()
        expect(mockNavigate).not.toHaveBeenCalled()
    })
})
