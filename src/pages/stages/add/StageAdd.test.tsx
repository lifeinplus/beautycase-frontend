import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/hooks/__mocks__/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import {
    mockStage1,
    mockStageCreate,
} from '@/features/stages/api/__mocks__/stagesApi'
import { useCreateStageMutation } from '@/features/stages/api/stagesApi'
import { mockError } from '@/shared/utils/error/__mocks__/getErrorMessage'
import { mockNavigate } from '@/tests/mocks/router'
import { StageAdd } from './StageAdd'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/stages/components/form/StageForm')
vi.mock('@/features/stages/api/stagesApi')
vi.mock('@/shared/utils/error/getErrorMessage')

describe('StageAdd', () => {
    const mockAddStage = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useCreateStageMutation as Mock).mockReturnValue([
            mockAddStage,
            { isLoading: false },
        ])

        mockAddStage.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue(mockStageCreate)
    })

    it('renders the StageForm with correct title', () => {
        render(<StageAdd />)

        expect(screen.getByTestId('mocked-stage-form')).toBeInTheDocument()
        expect(screen.getByText('titles.add')).toBeInTheDocument()
    })

    it('calls addStage and navigates on successful submission', async () => {
        const user = userEvent.setup()
        const { stepsText, ...restStage } = mockStage1

        render(<StageAdd />)
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

        render(<StageAdd />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockAddStage).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        expect(mockDispatch).not.toHaveBeenCalled()
        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
