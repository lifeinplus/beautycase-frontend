import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { mockNavigate } from '../../../../tests/mocks/router'
import { mockError } from '../../../../shared/utils/__mocks__/errorUtils'
import { clearFormData } from '../../../form/formSlice'
import {
    mockMakeupBag1,
    mockMakeupBagCreate,
} from '../../__mocks__/makeupBagsApi'
import { useCreateMakeupBagMutation } from '../../makeupBagsApi'
import { MakeupBagAddPage } from '../MakeupBagAddPage'

vi.mock('../../../../app/hooks')
vi.mock('../../../../shared/utils/errorUtils')
vi.mock('../../components/MakeupBagForm')
vi.mock('../../makeupBagsApi')

describe('MakeupBagAddPage', () => {
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
        render(<MakeupBagAddPage />)

        expect(screen.getByTestId('mocked-makeup-bag-form')).toBeInTheDocument()
        expect(screen.getByText('titles.add')).toBeInTheDocument()
    })

    it('calls addMakeupBag and navigates on successful submission', async () => {
        const user = userEvent.setup()

        render(<MakeupBagAddPage />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockAddMakeupBag).toHaveBeenCalledWith(mockMakeupBag1)
        expect(mockUnwrap).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
        expect(mockNavigate).toHaveBeenCalledWith('/makeup_bags/makeupBag3')
    })

    it('displays an error toast if submission fails', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<MakeupBagAddPage />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockAddMakeupBag).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        expect(mockDispatch).not.toHaveBeenCalled()
        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
