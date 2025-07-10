import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/__mocks__/hooks'
import { clearFormData } from '@/features/form/formSlice'
import {
    mockStage1,
    mockStageCreate,
} from '@/features/stages/__mocks__/stagesApi'
import { useCreateStageMutation } from '@/features/stages/stagesApi'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { mockNavigate } from '@/tests/mocks/router'
import { StageAddPage } from '../StageAddPage'

vi.mock('@/app/hooks')
vi.mock('@/features/form/formSlice')
vi.mock('@/features/stages/components/StageForm')
vi.mock('@/features/stages/stagesApi')
vi.mock('@/shared/utils/errorUtils')

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
