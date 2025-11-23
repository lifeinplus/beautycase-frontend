import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/hooks/__mocks__/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import { mockStage1 } from '@/features/stages/api/__mocks__/stagesApi'
import {
    useGetStageByIdQuery,
    useUpdateStageByIdMutation,
} from '@/features/stages/api/stagesApi'
import { ROUTES } from '@/shared/config/routes'
import { mockError } from '@/tests/mocks'
import { mockNavigate } from '@/tests/mocks/router'
import { spyConsoleError } from '@/tests/setup'
import { StageEdit } from './StageEdit'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/stages/components/form/StageForm')
vi.mock('@/features/stages/api/stagesApi')

describe('StageEdit', () => {
    const mockUpdateStageById = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useUpdateStageByIdMutation as Mock).mockReturnValue([
            mockUpdateStageById,
            { isLoading: false },
        ])

        mockUpdateStageById.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})

        vi.mocked(useGetStageByIdQuery as Mock).mockReturnValue({
            data: mockStage1,
        })
    })

    it('renders the StageForm with title', () => {
        render(<StageEdit />)

        expect(screen.getByTestId('mocked-stage-form')).toBeInTheDocument()
        expect(screen.getByText('titles.edit')).toBeInTheDocument()
    })

    it('handles form submission successfully', async () => {
        const user = userEvent.setup()

        render(<StageEdit />)
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
        expect(mockNavigate).toHaveBeenCalledWith(
            ROUTES.backstage.stages.details('123')
        )
    })

    it('shows error toast on failure', async () => {
        const user = userEvent.setup()

        mockUnwrap.mockRejectedValue(mockError)

        render(<StageEdit />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdateStageById).toHaveBeenCalled()
        expect(spyConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')

        expect(mockNavigate).not.toHaveBeenCalled()
    })
})
