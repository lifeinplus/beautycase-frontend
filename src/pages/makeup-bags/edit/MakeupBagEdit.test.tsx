import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/__mocks__/hooks'
import { clearFormData } from '@/features/form/formSlice'
import { mockMakeupBag1 } from '@/features/makeupBags/__mocks__/makeupBagsApi'
import {
    useGetMakeupBagByIdQuery,
    useUpdateMakeupBagByIdMutation,
} from '@/features/makeupBags/makeupBagsApi'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { mockNavigate } from '@/tests/mocks/router'
import { MakeupBagEdit } from './MakeupBagEdit'

vi.mock('@/app/hooks')
vi.mock('@/features/form/formSlice')
vi.mock('@/features/makeupBags/components/MakeupBagForm')
vi.mock('@/features/makeupBags/makeupBagsApi')
vi.mock('@/shared/utils/errorUtils')

describe('MakeupBagEdit', () => {
    const mockUpdateMakeupBagById = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useUpdateMakeupBagByIdMutation as Mock).mockReturnValue([
            mockUpdateMakeupBagById,
        ])

        mockUpdateMakeupBagById.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})

        vi.mocked(useGetMakeupBagByIdQuery as Mock).mockReturnValue({
            data: mockMakeupBag1,
        })
    })

    it('renders the MakeupBagForm with title', () => {
        render(<MakeupBagEdit />)

        expect(screen.getByTestId('mocked-makeup-bag-form')).toBeInTheDocument()
        expect(screen.getByText('titles.edit')).toBeInTheDocument()
    })

    it('handles form submission successfully', async () => {
        const user = userEvent.setup()

        render(<MakeupBagEdit />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdateMakeupBagById).toHaveBeenCalled()
        expect(mockUnwrap).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
        expect(mockNavigate).toHaveBeenCalledWith('/makeup-bags/123')
    })

    it('shows error toast on failure', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<MakeupBagEdit />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdateMakeupBagById).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
