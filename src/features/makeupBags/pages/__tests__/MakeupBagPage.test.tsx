import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import { useAppSelector } from '../../../../app/hooks'
import { mockNavigate } from '../../../../tests/mocks/router'
import { mockError } from '../../../../utils/__mocks__/errorUtils'
import { selectRole, selectUsername } from '../../../auth/authSlice'
import { mockMakeupBag1 } from '../../__mocks__/makeupBagsApi'
import {
    useDeleteMakeupBagByIdMutation,
    useGetMakeupBagByIdQuery,
} from '../../makeupBagsApi'
import { MakeupBagPage } from '../MakeupBagPage'
import { usePDFExport } from '../../hooks/usePDFExport'

vi.mock('../../../../app/hooks')
vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/navigation/NavigationButton')
vi.mock('../../../../components/ui/ModalDelete')
vi.mock('../../../../components/DataWrapper')
vi.mock('../../../../components/Footer')
vi.mock('../../../../components/Hero')
vi.mock('../../../../components/TopPanel')
vi.mock('../../../../utils/errorUtils')
vi.mock('../../../../utils/menu')
vi.mock('../../../auth/authSlice')
vi.mock('../../../form/formSlice')
vi.mock('../../../stages/components/Stages')
vi.mock('../../../tools/components/Tools')
vi.mock('../../hooks/usePDFExport')
vi.mock('../../makeupBagsApi')

describe('MakeupBagPage', () => {
    const mockDeleteMakeupBagById = vi.fn()
    const mockDeleteUnwrap = vi.fn()

    const mockExportToPDF = vi.fn()
    const mockClearError = vi.fn()

    beforeEach(() => {
        vi.mocked(useAppSelector).mockImplementation((selector) => {
            if (selector === selectRole) return 'admin'
            if (selector === selectUsername) return 'testuser'
            return null
        })

        vi.mocked(useGetMakeupBagByIdQuery as Mock).mockReturnValue({
            data: mockMakeupBag1,
            isLoading: false,
            error: null,
        })

        vi.mocked(useDeleteMakeupBagByIdMutation as Mock).mockReturnValue([
            mockDeleteMakeupBagById,
        ])

        mockDeleteMakeupBagById.mockReturnValue({ unwrap: mockDeleteUnwrap })
        mockDeleteUnwrap.mockResolvedValue({})

        vi.mocked(usePDFExport as any).mockReturnValue({
            exportToPDF: mockExportToPDF,
            error: null,
            clearError: mockClearError,
        })
    })

    it('renders the page with correct data', () => {
        render(<MakeupBagPage />)

        const ids = [
            'mocked-top-panel',
            'mocked-hero',
            'mocked-stages',
            'mocked-tools',
        ]

        ids.forEach((id) => expect(screen.getByTestId(id)).toBeInTheDocument())
    })

    it('should navigate back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<MakeupBagPage />)
        await user.click(screen.getByTestId('mocked-back-button'))

        expect(mockNavigate).toHaveBeenCalledWith('/makeup_bags', {
            replace: true,
            state: { scrollId: '123' },
        })
    })

    describe('PDF Export', () => {
        it('exports to PDF successfully', async () => {
            const user = userEvent.setup()

            const mockFilename = `${mockMakeupBag1.category?.name.replace(/\s+/g, '-')}-${mockMakeupBag1.client?.username}.pdf`

            mockExportToPDF.mockResolvedValue({ success: true })

            render(<MakeupBagPage />)
            await user.click(screen.getByRole('button', { name: /export/ }))

            expect(mockExportToPDF).toHaveBeenCalledWith(
                {
                    category: mockMakeupBag1.category,
                    stages: mockMakeupBag1.stages,
                    tools: mockMakeupBag1.tools,
                },
                mockFilename
            )
        })

        it('shows error toast if data is missing', async () => {
            const user = userEvent.setup()

            vi.mocked(useGetMakeupBagByIdQuery as Mock).mockReturnValue({
                data: undefined,
                isLoading: false,
                error: null,
            })

            render(<MakeupBagPage />)
            await user.click(screen.getByRole('button', { name: /export/ }))

            expect(toast.error).toHaveBeenCalledWith('toast.noExportData')
            expect(mockExportToPDF).not.toHaveBeenCalled()
        })

        it('shows export error toast and clears error', async () => {
            const mockErrorMessage = 'Export failed'

            vi.mocked(usePDFExport as any).mockReturnValue({
                exportToPDF: mockExportToPDF,
                error: mockErrorMessage,
                clearError: mockClearError,
            })

            render(<MakeupBagPage />)

            expect(toast.error).toHaveBeenCalledWith(mockErrorMessage)
            expect(mockClearError).toHaveBeenCalled()
        })
    })

    describe('Delete Functionality', () => {
        it('should delete makeup bag when confirm is clicked', async () => {
            const user = userEvent.setup()

            render(<MakeupBagPage />)

            await user.click(screen.getByRole('button', { name: /delete/i }))
            await user.click(screen.getByRole('button', { name: /confirm/i }))

            expect(mockDeleteMakeupBagById).toHaveBeenCalledWith('123')
            expect(toast.success).toHaveBeenCalledWith('toast.delete')
            expect(mockNavigate).toHaveBeenCalledWith('/makeup_bags')
        })

        it('shows error toast if delete fails', async () => {
            const user = userEvent.setup()

            const mockConsoleError = vi
                .spyOn(console, 'error')
                .mockImplementation(() => {})

            mockDeleteUnwrap.mockRejectedValue(mockError)

            render(<MakeupBagPage />)

            await user.click(screen.getByRole('button', { name: /delete/i }))
            await user.click(screen.getByRole('button', { name: /confirm/i }))

            expect(mockDeleteMakeupBagById).toHaveBeenCalledWith('123')
            expect(mockConsoleError).toHaveBeenCalledWith(mockError)
            expect(toast.error).toHaveBeenCalledWith(mockError.message)

            mockConsoleError.mockRestore()
        })
    })
})
