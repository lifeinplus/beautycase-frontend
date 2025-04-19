import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, it, vi, expect, beforeEach, Mock } from 'vitest'

import { mockError } from '../../../../tests/mocks'
import { mockDispatch } from '../../../../tests/mocks/app'
import { mockMakeupBag } from '../../../../tests/mocks/handlers/makeupBagsHandlers'
import { mockNavigate } from '../../../../tests/mocks/router'
import { clearFormData } from '../../../form/formSlice'
import {
    useEditMakeupBagMutation,
    useGetMakeupBagByIdQuery,
} from '../../makeupBagsApiSlice'
import { MakeupBagEditPage } from '../MakeupBagEditPage'

vi.mock('../../../../utils/errorUtils', () => ({
    getErrorMessage: vi.fn((error) => error.message),
}))

vi.mock('../../components/MakeupBagForm')

vi.mock('../../makeupBagsApiSlice', () => ({
    useEditMakeupBagMutation: vi.fn(),
    useGetMakeupBagByIdQuery: vi.fn(),
}))

vi.mock('../../../form/formSlice', async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...(actual as object),
        clearFormData: vi.fn(),
        setFormData: vi.fn(),
    }
})

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
