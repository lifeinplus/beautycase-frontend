import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/hooks/__mocks__/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import {
    mockMakeupBag1,
    mockMakeupBagCreate,
} from '@/features/makeup-bags/api/__mocks__/makeupBagsApi'
import { useCreateMakeupBagMutation } from '@/features/makeup-bags/api/makeupBagsApi'
import { mockError } from '@/shared/utils/error/__mocks__/getErrorMessage'
import { mockNavigate } from '@/tests/mocks/router'
import { MakeupBagAdd } from './MakeupBagAdd'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/makeup-bags/components/form/MakeupBagForm')
vi.mock('@/shared/utils/error/getErrorMessage')
vi.mock('@/features/makeup-bags/api/makeupBagsApi')

describe('MakeupBagAdd', () => {
    const mockAddMakeupBag = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useCreateMakeupBagMutation as Mock).mockReturnValue([
            mockAddMakeupBag,
        ])

        mockAddMakeupBag.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue(mockMakeupBagCreate)
    })

    it('renders the MakeupBagForm with correct title', () => {
        render(<MakeupBagAdd />)

        expect(screen.getByTestId('mocked-makeup-bag-form')).toBeInTheDocument()
        expect(screen.getByText('titles.add')).toBeInTheDocument()
    })

    it('calls addMakeupBag and navigates on successful submission', async () => {
        const user = userEvent.setup()

        render(<MakeupBagAdd />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockAddMakeupBag).toHaveBeenCalledWith(mockMakeupBag1)
        expect(mockUnwrap).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
        expect(mockNavigate).toHaveBeenCalledWith('/makeup-bags/makeupBag3')
    })

    it('displays an error toast if submission fails', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<MakeupBagAdd />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockAddMakeupBag).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        expect(mockDispatch).not.toHaveBeenCalled()
        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
