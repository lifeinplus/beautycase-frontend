import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { useUpdateToolStoreLinksMutation } from '@/features/tools/api/toolsApi'
import { mockError } from '@/tests/mocks'
import { spyConsoleError } from '@/tests/setup'
import { mockStoreLinks } from '../../../api/__mocks__/storesApi'
import { StoreLinksAddTool } from './StoreLinksAddTool'

vi.mock('@/features/tools/api/toolsApi')
vi.mock('@/widgets/store/links-add/StoreLinksAdd')

describe('StoreLinksAddTool', () => {
    const mockUpdate = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useUpdateToolStoreLinksMutation as Mock).mockReturnValue([
            mockUpdate,
            { isLoading: false },
        ])

        mockUpdate.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})
    })

    it('renders StoreLinksAdd successfully', async () => {
        render(<StoreLinksAddTool />)
        expect(screen.getByTestId('mocked-store-links-add')).toBeInTheDocument()
    })

    it('passes correct onSave handler', async () => {
        const user = userEvent.setup()

        render(<StoreLinksAddTool />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdate).toHaveBeenCalledWith({
            id: '123',
            data: { storeLinks: mockStoreLinks },
        })

        expect(mockUnwrap).toHaveBeenCalled()
    })

    it('shows error toast on failure', async () => {
        const user = userEvent.setup()

        mockUnwrap.mockRejectedValue(mockError)

        render(<StoreLinksAddTool />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdate).toHaveBeenCalled()
        expect(spyConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')
    })
})
