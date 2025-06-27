import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { mockNavigate } from '../../../../tests/mocks/router'
import { mockError } from '../../../../utils/__mocks__/errorUtils'
import { clearFormData } from '../../../form/formSlice'
import { mockStage1, mockStageCreate } from '../../__mocks__/stagesApi'
import { useCreateStageMutation } from '../../stagesApi'
import { StageAddPage } from '../StageAddPage'

vi.mock('../../../../app/hooks')
vi.mock('../../../../utils/errorUtils')
vi.mock('../../../form/formSlice')
vi.mock('../../components/StageForm')
vi.mock('../../stagesApi')

describe('StageAddPage', () => {
    const mockAddStage = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useCreateStageMutation as Mock).mockReturnValue([
            mockAddStage,
        ])

        mockAddStage.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue(mockStageCreate)
    })

    it('renders the StageForm with correct title', () => {
        render(<StageAddPage />)

        expect(screen.getByTestId('mocked-stage-form')).toBeInTheDocument()
        expect(screen.getByText('titles.add')).toBeInTheDocument()
    })

    it('calls addStage and navigates on successful submission', async () => {
        const user = userEvent.setup()
        const { stepsText, ...restStage } = mockStage1

        render(<StageAddPage />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockAddStage).toHaveBeenCalledWith(restStage)
        expect(mockUnwrap).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
        expect(mockNavigate).toHaveBeenCalledWith('/stages/stage3')
    })

    it('displays an error toast if submission fails', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<StageAddPage />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockAddStage).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        expect(mockDispatch).not.toHaveBeenCalled()
        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
