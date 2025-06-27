import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, it, vi, expect, beforeEach, Mock } from 'vitest'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { mockNavigate } from '../../../../tests/mocks/router'
import { mockError } from '../../../../utils/__mocks__/errorUtils'
import { clearFormData } from '../../../form/formSlice'
import { mockProduct1 } from '../../__mocks__/productsApi'
import {
    useUpdateProductByIdMutation,
    useGetProductByIdQuery,
} from '../../productsApi'
import { ProductEditPage } from '../ProductEditPage'

vi.mock('../../../../app/hooks')
vi.mock('../../../../utils/errorUtils')
vi.mock('../../../form/formSlice')
vi.mock('../../components/ProductForm')
vi.mock('../../productsApi')

describe('ProductEditPage', () => {
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
        render(<ProductEditPage />)

        expect(screen.getByTestId('mocked-product-form')).toBeInTheDocument()
        expect(screen.getByText('titles.edit')).toBeInTheDocument()
    })

    it('handles form submission successfully', async () => {
        const user = userEvent.setup()

        render(<ProductEditPage />)
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

        render(<ProductEditPage />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdateProductById).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
