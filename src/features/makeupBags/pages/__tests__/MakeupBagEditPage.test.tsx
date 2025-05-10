import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, it, vi, expect, beforeEach, Mock } from 'vitest'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { mockNavigate } from '../../../../tests/mocks/router'
import { mockError } from '../../../../utils/__mocks__/errorUtils'
import { clearFormData } from '../../../form/formSlice'
import { mockMakeupBag } from '../../__mocks__/makeupBagsApi'
import {
    useEditMakeupBagMutation,
    useGetMakeupBagByIdQuery,
} from '../../makeupBagsApi'
import { MakeupBagEditPage } from '../MakeupBagEditPage'

vi.mock('../../../../app/hooks')
vi.mock('../../../../utils/errorUtils')
vi.mock('../../../form/formSlice')
vi.mock('../../components/MakeupBagForm')
vi.mock('../../makeupBagsApi')

describe('MakeupBagEditPage', () => {
    const mockEditMakeupBag = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useEditMakeupBagMutation as Mock).mockReturnValue([
            mockEditMakeupBag,
        ])

        mockEditMakeupBag.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})

        vi.mocked(useGetMakeupBagByIdQuery as Mock).mockReturnValue({
            data: mockMakeupBag,
        })
    })

    it('renders the MakeupBagForm with title', () => {
        render(<MakeupBagEditPage />)

        const form = screen.getByTestId('mocked-makeup-bag-form')
        const title = screen.getByText('Редактировать косметичку')

        expect(form).toBeInTheDocument()
        expect(title).toBeInTheDocument()
    })

    it('handles form submission successfully', async () => {
        const user = userEvent.setup()

        render(<MakeupBagEditPage />)

        const button = screen.getByTestId('mocked-submit-button')
        await user.click(button)

        expect(mockEditMakeupBag).toHaveBeenCalledWith({
            id: '123',
            ...mockMakeupBag,
        })

        expect(mockUnwrap).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
        expect(mockNavigate).toHaveBeenCalledWith('/makeup_bags/123')
    })

    it('shows error toast on failure', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<MakeupBagEditPage />)

        const button = screen.getByTestId('mocked-submit-button')
        await user.click(button)

        expect(mockEditMakeupBag).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
