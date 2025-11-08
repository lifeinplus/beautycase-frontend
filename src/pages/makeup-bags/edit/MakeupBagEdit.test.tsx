import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/hooks/__mocks__/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import { mockMakeupBag1 } from '@/features/makeup-bags/api/__mocks__/makeupBagsApi'
import {
    useGetMakeupBagByIdQuery,
    useUpdateMakeupBagByIdMutation,
} from '@/features/makeup-bags/api/makeupBagsApi'
import { ROUTES } from '@/shared/config/routes'
import { mockError } from '@/tests/mocks'
import { mockNavigate } from '@/tests/mocks/router'
import { spyConsoleError } from '@/tests/setup'
import { MakeupBagEdit } from './MakeupBagEdit'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/makeup-bags/components/form/MakeupBagForm')
vi.mock('@/features/makeup-bags/api/makeupBagsApi')

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
        expect(mockNavigate).toHaveBeenCalledWith(
            ROUTES.backstage.makeupBags.details('123')
        )
    })

    it('shows error toast on failure', async () => {
        const user = userEvent.setup()

        mockUnwrap.mockRejectedValue(mockError)

        render(<MakeupBagEdit />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdateMakeupBagById).toHaveBeenCalled()
        expect(spyConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')

        expect(mockNavigate).not.toHaveBeenCalled()
    })
})
