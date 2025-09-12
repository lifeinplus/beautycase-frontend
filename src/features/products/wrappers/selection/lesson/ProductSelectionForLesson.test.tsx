import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { useUpdateLessonProductsMutation } from '@/features/lessons/api/lessonsApi'
import { mockError } from '@/shared/utils/error/__mocks__/getErrorMessage'
import { ProductSelectionForLesson } from './ProductSelectionForLesson'

vi.mock('@/features/lessons/api/lessonsApi')
vi.mock('@/shared/utils/error/getErrorMessage')
vi.mock('@/widgets/product/product-selection/ProductSelection')

describe('ProductSelectionForLesson', () => {
    const mockUpdate = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useUpdateLessonProductsMutation as Mock).mockReturnValue([
            mockUpdate,
            { isLoading: false },
        ])

        mockUpdate.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})
    })

    it('renders ProductSelection successfully', async () => {
        render(<ProductSelectionForLesson />)

        expect(
            screen.getByTestId('mocked-product-selection')
        ).toBeInTheDocument()
    })

    it('passes correct onSave handler', async () => {
        const user = userEvent.setup()

        render(<ProductSelectionForLesson />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdate).toHaveBeenCalledWith({
            id: '123',
            data: { productIds: ['product1', 'product2'] },
        })

        expect(mockUnwrap).toHaveBeenCalled()
    })

    it('shows error toast on failure', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<ProductSelectionForLesson />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdate).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })
})
