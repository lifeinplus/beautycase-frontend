import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/__mocks__/hooks'
import { clearFormData } from '@/features/form/formSlice'
import { mockTool1 } from '@/features/tools/__mocks__/toolsApi'
import {
    useGetToolByIdQuery,
    useUpdateToolByIdMutation,
} from '@/features/tools/toolsApi'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { mockNavigate } from '@/tests/mocks/router'
import { ToolEdit } from './ToolEdit'

vi.mock('@/app/hooks')
vi.mock('@/features/form/formSlice')
vi.mock('@/features/tools/components/ToolForm')
vi.mock('@/features/tools/toolsApi')
vi.mock('@/shared/utils/errorUtils')

describe('ToolEdit', () => {
    const mockUpdateToolById = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useUpdateToolByIdMutation as Mock).mockReturnValue([
            mockUpdateToolById,
            { isLoading: false },
        ])

        mockUpdateToolById.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue({})

        vi.mocked(useGetToolByIdQuery as Mock).mockReturnValue({
            data: mockTool1,
        })
    })

    it('renders the ToolForm with title', () => {
        render(<ToolEdit />)

        expect(screen.getByTestId('mocked-tool-form')).toBeInTheDocument()
        expect(screen.getByText('titles.edit')).toBeInTheDocument()
    })

    it('handles form submission successfully', async () => {
        const user = userEvent.setup()

        render(<ToolEdit />)
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

        render(<ToolEdit />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockUpdateToolById).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
