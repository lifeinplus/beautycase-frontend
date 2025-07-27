import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { useUpdateStageProductsMutation } from '@/features/stages/stagesApi'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { ProductSelectionForStage } from '../ProductSelectionForStage'

vi.mock('@/features/stages/stagesApi')
vi.mock('@/shared/utils/errorUtils')
vi.mock('@/widgets/product/product-selection/ProductSelection')

describe('ProductSelectionForStage', () => {
    const mockUpdate = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useUpdateStageProductsMutation as Mock).mockReturnValue([
            mockUpdate,
            { isLoading: false },
        ])

        mockUpdate.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})
    })

    it('renders ProductSelection successfully', async () => {
        render(<ProductSelectionForStage />)

        expect(
            screen.getByTestId('mocked-product-selection')
        ).toBeInTheDocument()
    })

    it('passes correct onSave handler', async () => {
        const user = userEvent.setup()

        render(<ProductSelectionForStage />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdate).toHaveBeenCalledWith({
            id: '123',
            data: { productIds: ['product1', 'product2'] },
        })

        expect(mockUnwrap).toHaveBeenCalled()
    })

    it('shows error toast on failure', async () => {
        const user = userEvent.setup()

        const spyConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<ProductSelectionForStage />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdate).toHaveBeenCalled()
        expect(spyConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        spyConsoleError.mockRestore()
    })
})
