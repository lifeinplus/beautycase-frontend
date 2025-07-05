import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, it, vi, expect, beforeEach, Mock } from 'vitest'

import { mockDispatch } from '@/app/__mocks__/hooks'
import { mockNavigate } from '@/tests/mocks/router'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { clearFormData } from '@/features/form/formSlice'
import { mockTool1 } from '../../__mocks__/toolsApi'
import { useUpdateToolByIdMutation, useGetToolByIdQuery } from '../../toolsApi'
import { ToolEditPage } from '../ToolEditPage'

vi.mock('@/app/hooks')
vi.mock('@/shared/utils/errorUtils')
vi.mock('@/features/form/formSlice')
vi.mock('../../components/ToolForm')
vi.mock('../../toolsApi')

describe('ToolEditPage', () => {
    const mockUpdateToolById = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useUpdateToolByIdMutation as Mock).mockReturnValue([
            mockUpdateToolById,
        ])

        mockUpdateToolById.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})

        vi.mocked(useGetToolByIdQuery as Mock).mockReturnValue({
            data: mockTool1,
        })
    })

    it('renders the ToolForm with title', () => {
        render(<ToolEditPage />)

        expect(screen.getByTestId('mocked-tool-form')).toBeInTheDocument()
        expect(screen.getByText('titles.edit')).toBeInTheDocument()
    })

    it('handles form submission successfully', async () => {
        const user = userEvent.setup()

        render(<ToolEditPage />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdateToolById).toHaveBeenCalledWith({
            id: '123',
            tool: mockTool1,
        })

        expect(mockUnwrap).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
        expect(mockNavigate).toHaveBeenCalledWith('/tools/123')
    })

    it('shows error toast on failure', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<ToolEditPage />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdateToolById).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
