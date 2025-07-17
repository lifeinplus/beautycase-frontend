import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { useUpdateToolStoreLinksMutation } from '@/features/tools/toolsApi'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { mockStoreLinks } from '../__mocks__/storesApi'
import { StoreLinksAddPageForTool } from './StoreLinksAddPageForTool'

vi.mock('@/features/tools/toolsApi')
vi.mock('@/shared/utils/errorUtils')
vi.mock('@/widgets/store/store-links-add/StoreLinksAdd')

describe('StoreLinksAddPageForTool', () => {
    const mockUpdate = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useUpdateToolStoreLinksMutation as Mock).mockReturnValue([
            mockUpdate,
        ])

        mockUpdate.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})
    })

    it('renders StoreLinksAdd successfully', async () => {
        render(<StoreLinksAddPageForTool />)

        expect(screen.getByTestId('mocked-store-links-add')).toBeInTheDocument()
    })

    it('passes correct onSave handler', async () => {
        const user = userEvent.setup()

        render(<StoreLinksAddPageForTool />)
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

        render(<StoreLinksAddPageForTool />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdate).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })
})
