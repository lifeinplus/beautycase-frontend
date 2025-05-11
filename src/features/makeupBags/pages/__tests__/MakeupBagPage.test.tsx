import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import { useAppSelector } from '../../../../app/hooks'
import { mockNavigate } from '../../../../tests/mocks/router'
import { mockError } from '../../../../utils/__mocks__/errorUtils'
import { selectRole, selectUsername } from '../../../auth/authSlice'
import { mockMakeupBag } from '../../__mocks__/makeupBagsApi'
import {
    useDeleteMakeupBagMutation,
    useReadMakeupBagQuery,
} from '../../makeupBagsApi'
import { MakeupBagPage } from '../MakeupBagPage'

vi.mock('../../../../app/hooks')
vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/navigation/NavigationButton')
vi.mock('../../../../components/ui/ModalDelete')
vi.mock('../../../../components/DataWrapper')
vi.mock('../../../../components/Footer')
vi.mock('../../../../components/Hero')
vi.mock('../../../../components/TopPanel')
vi.mock('../../../../utils/errorUtils')
vi.mock('../../../../utils/menu')
vi.mock('../../../auth/authSlice')
vi.mock('../../../form/formSlice')
vi.mock('../../../stages/components/Stages')
vi.mock('../../../tools/components/Tools')
vi.mock('../../makeupBagsApi')

describe('MakeupBagPage', () => {
    const mockDeleteMakeupBag = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useAppSelector).mockImplementation((selector) => {
            if (selector === selectRole) return 'admin'
            if (selector === selectUsername) return 'testuser'
            return null
        })

        vi.mocked(useReadMakeupBagQuery as Mock).mockReturnValue({
            data: mockMakeupBag,
            isLoading: false,
            error: null,
        })

        vi.mocked(useDeleteMakeupBagMutation as Mock).mockReturnValue([
            mockDeleteMakeupBag,
        ])

        mockDeleteMakeupBag.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})
    })

    it('renders the page with correct data', () => {
        render(<MakeupBagPage />)

        const topPanel = screen.getByTestId('mocked-top-panel')
        const hero = screen.getByTestId('mocked-hero')
        const stages = screen.getByTestId('mocked-stages')
        const tools = screen.getByTestId('mocked-tools')

        expect(topPanel).toBeInTheDocument()
        expect(hero).toBeInTheDocument()
        expect(stages).toBeInTheDocument()
        expect(tools).toBeInTheDocument()
    })

    it('should navigate back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<MakeupBagPage />)

        const button = screen.getByTestId('mocked-back-button')
        await user.click(button)

        expect(mockNavigate).toHaveBeenCalledWith('/makeup_bags', {
            replace: true,
            state: { scrollId: '123' },
        })
    })

    it('should delete makeup bag when confirm is clicked', async () => {
        const user = userEvent.setup()

        render(<MakeupBagPage />)

        const deleteButton = screen.getByTestId('mocked-nav-button-Удалить')

        await user.click(deleteButton)

        const modalDeleteConfirm = screen.getByTestId(
            'mocked-modal-delete-confirm'
        )

        await user.click(modalDeleteConfirm)

        expect(mockDeleteMakeupBag).toHaveBeenCalledWith('123')
        expect(toast.success).toHaveBeenCalledWith('Косметичка удалена')
        expect(mockNavigate).toHaveBeenCalledWith('/makeup_bags')
    })

    it('shows error toast if delete fails', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<MakeupBagPage />)

        const deleteButton = screen.getByTestId('mocked-nav-button-Удалить')

        await user.click(deleteButton)

        const modalDeleteConfirm = screen.getByTestId(
            'mocked-modal-delete-confirm'
        )

        await user.click(modalDeleteConfirm)

        expect(mockDeleteMakeupBag).toHaveBeenCalledWith('123')
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })
})
