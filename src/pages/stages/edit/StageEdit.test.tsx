import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/__mocks__/hooks'
import { clearFormData } from '@/features/form/formSlice'
import { mockStage1 } from '@/features/stages/__mocks__/stagesApi'
import {
    useGetStageByIdQuery,
    useUpdateStageByIdMutation,
} from '@/features/stages/stagesApi'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { mockNavigate } from '@/tests/mocks/router'
import { StageEdit } from './StageEdit'

vi.mock('@/app/hooks')
vi.mock('@/features/form/formSlice')
vi.mock('@/features/stages/components/StageForm')
vi.mock('@/features/stages/stagesApi')
vi.mock('@/shared/utils/errorUtils')

describe('StageEdit', () => {
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
        expect(mockNavigate).toHaveBeenCalledWith('/stages/123')
    })

    it('shows error toast on failure', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<StageEdit />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdateStageById).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
