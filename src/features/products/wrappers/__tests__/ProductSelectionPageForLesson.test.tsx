import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { useUpdateLessonProductsMutation } from '@/features/lessons/lessonsApi'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { ProductSelectionPageForLesson } from '../ProductSelectionPageForLesson'

vi.mock('@/features/lessons/lessonsApi')
vi.mock('@/shared/utils/errorUtils')
vi.mock('@/widgets/product/product-selection/ProductSelection')

describe('ProductSelectionPageForLesson', () => {
    const mockUpdate = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useUpdateLessonProductsMutation as Mock).mockReturnValue([
            mockUpdate,
        ])

        mockUpdate.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})
    })

    it('renders ProductSelection successfully', async () => {
        render(<ProductSelectionPageForLesson />)

        expect(
            screen.getByTestId('mocked-product-selection')
        ).toBeInTheDocument()
    })

    it('passes correct onSave handler', async () => {
        const user = userEvent.setup()

        render(<ProductSelectionPageForLesson />)
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

        render(<ProductSelectionPageForLesson />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdate).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })
})
