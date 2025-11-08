import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/hooks/__mocks__/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import {
    mockTool1,
    mockToolCreate,
} from '@/features/tools/api/__mocks__/toolsApi'
import { useCreateToolMutation } from '@/features/tools/api/toolsApi'
import { ROUTES } from '@/shared/config/routes'
import { mockError } from '@/tests/mocks'
import { mockNavigate } from '@/tests/mocks/router'
import { spyConsoleError } from '@/tests/setup'
import { ToolAdd } from './ToolAdd'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/tools/components/form/ToolForm')
vi.mock('@/features/tools/api/toolsApi')

describe('ToolAdd', () => {
    const mockAddTool = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useCreateToolMutation as Mock).mockReturnValue([
            mockAddTool,
            { isLoading: false },
        ])

        mockAddTool.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue(mockToolCreate)
    })

    it('renders the ToolForm with correct title', () => {
        render(<ToolAdd />)

        const form = screen.getByTestId('mocked-tool-form')
        const title = screen.getByText('titles.add')

        expect(form).toBeInTheDocument()
        expect(title).toBeInTheDocument()
    })

    it('calls addTool and navigates on successful submission', async () => {
        const user = userEvent.setup()

        render(<ToolAdd />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockAddTool).toHaveBeenCalledWith(mockTool1)
        expect(mockUnwrap).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
        expect(mockNavigate).toHaveBeenCalledWith(
            ROUTES.backstage.tools.details('tool3')
        )
    })

    it('displays an error toast if submission fails', async () => {
        const user = userEvent.setup()

        mockUnwrap.mockRejectedValue(mockError)

        render(<ToolAdd />)
        await user.click(screen.getByTestId('mocked-submit-button'))

        expect(mockAddTool).toHaveBeenCalled()
        expect(spyConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')

        expect(mockDispatch).not.toHaveBeenCalled()
        expect(mockNavigate).not.toHaveBeenCalled()
    })
})
