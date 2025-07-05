import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, it, vi, expect, beforeEach, Mock } from 'vitest'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { mockNavigate } from '../../../../tests/mocks/router'
import { mockError } from '../../../../shared/utils/__mocks__/errorUtils'
import { clearFormData } from '../../../form/formSlice'
import { mockStage1 } from '../../__mocks__/stagesApi'
import {
    useGetStageByIdQuery,
    useUpdateStageByIdMutation,
} from '../../stagesApi'
import { StageEditPage } from '../StageEditPage'

vi.mock('../../../../app/hooks')
vi.mock('../../../../shared/utils/errorUtils')
vi.mock('../../../form/formSlice')
vi.mock('../../components/StageForm')
vi.mock('../../stagesApi')

describe('StageEditPage', () => {
    const mockUpdateStageById = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useUpdateStageByIdMutation as Mock).mockReturnValue([
            mockUpdateStageById,
        ])

        mockUpdateStageById.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})

        vi.mocked(useGetStageByIdQuery as Mock).mockReturnValue({
            data: mockStage1,
        })
    })

    it('renders the StageForm with title', () => {
        render(<StageEditPage />)

        expect(screen.getByTestId('mocked-stage-form')).toBeInTheDocument()
        expect(screen.getByText('titles.edit')).toBeInTheDocument()
    })

    it('handles form submission successfully', async () => {
        const user = userEvent.setup()

        render(<StageEditPage />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdateStageById).toHaveBeenCalledWith({
            id: '123',
            stage: {
                ...mockStage1,
                stepsText: undefined,
            },
        })

        expect(mockUnwrap).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
        expect(mockNavigate).toHaveBeenCalledWith('/stages/123')
    })

    it('shows error toast on failure', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<StageEditPage />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdateStageById).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
