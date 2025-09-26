import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { useUpdateProductStoreLinksMutation } from '@/features/products/api/productsApi'
import { mockError } from '@/tests/mocks'
import { mockStoreLinks } from '../../../api/__mocks__/storesApi'
import { StoreLinksAddForProduct } from './StoreLinksAddForProduct'

vi.mock('@/features/products/api/productsApi')
vi.mock('@/widgets/store/store-links-add/StoreLinksAdd')

describe('StoreLinksAddForProduct', () => {
    const mockUpdate = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useUpdateProductStoreLinksMutation as Mock).mockReturnValue([
            mockUpdate,
            { isLoading: false },
        ])

        mockUpdate.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})
    })

    it('renders StoreLinksAdd successfully', async () => {
        render(<StoreLinksAddForProduct />)

        expect(screen.getByTestId('mocked-store-links-add')).toBeInTheDocument()
    })

    it('passes correct onSave handler', async () => {
        const user = userEvent.setup()

        render(<StoreLinksAddForProduct />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdate).toHaveBeenCalledWith({
            id: '123',
            data: { storeLinks: mockStoreLinks },
        })

        expect(mockUnwrap).toHaveBeenCalled()
    })

    it('shows error toast on failure', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<StoreLinksAddForProduct />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdate).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')

        mockConsoleError.mockRestore()
    })
})
