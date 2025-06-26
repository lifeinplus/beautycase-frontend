import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { mockNavigate } from '../../../../tests/mocks/router'
import { mockError } from '../../../../utils/__mocks__/errorUtils'
import { clearFormData } from '../../../form/formSlice'
import { mockTool1, mockToolCreate } from '../../__mocks__/toolsApi'
import { useCreateToolMutation } from '../../toolsApi'
import { ToolAddPage } from '../ToolAddPage'

vi.mock('../../../../app/hooks')
vi.mock('../../../../utils/errorUtils')
vi.mock('../../../form/formSlice')
vi.mock('../../components/ToolForm')
vi.mock('../../toolsApi')

describe('ToolAddPage', () => {
    const mockAddTool = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useCreateToolMutation as Mock).mockReturnValue([mockAddTool])

        mockAddTool.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue(mockToolCreate)
    })

    it('renders the ToolForm with correct title', () => {
        render(<ToolAddPage />)

        const form = screen.getByTestId('mocked-tool-form')
        const title = screen.getByText('titles.add')

        expect(form).toBeInTheDocument()
        expect(title).toBeInTheDocument()
    })

    it('calls addTool and navigates on successful submission', async () => {
        const user = userEvent.setup()

        render(<ToolAddPage />)

        const button = screen.getByTestId('mocked-submit-button')
        await user.click(button)

        expect(mockAddTool).toHaveBeenCalledWith(mockTool1)
        expect(mockUnwrap).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
        expect(mockNavigate).toHaveBeenCalledWith('/tools/tool3')
    })

    it('displays an error toast if submission fails', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        render(<ToolAddPage />)

        const button = screen.getByTestId('mocked-submit-button')
        await user.click(button)

        expect(mockAddTool).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        expect(mockDispatch).not.toHaveBeenCalled()
        expect(mockNavigate).not.toHaveBeenCalled()

        mockConsoleError.mockRestore()
    })
})
