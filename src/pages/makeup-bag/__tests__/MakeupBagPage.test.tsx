import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { useAppSelector } from '@/app/hooks'
import { selectRole, selectUsername } from '@/features/auth/authSlice'
import { mockCategory1 } from '@/features/categories/__mocks__/categoriesApi'
import { mockMakeupBag1 } from '@/features/makeupBags/__mocks__/makeupBagsApi'
import { usePDFExport } from '@/features/makeupBags/hooks/usePDFExport'
import {
    useDeleteMakeupBagByIdMutation,
    useGetMakeupBagByIdQuery,
} from '@/features/makeupBags/makeupBagsApi'
import { generatePdfFilename } from '@/features/makeupBags/utils/generatePdfFilename'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { mockNavigate } from '@/tests/mocks/router'
import { MakeupBagPage } from '../MakeupBagPage'

vi.mock('@/app/hooks')
vi.mock('@/shared/components/modals/ModalDelete')
vi.mock('@/shared/components/navigation/NavBar')
vi.mock('@/shared/components/navigation/NavButton')
vi.mock('@/shared/components/DataWrapper')
vi.mock('@/shared/components/Footer')
vi.mock('@/shared/components/common/Hero')
vi.mock('@/shared/components/layout/TopPanel')
vi.mock('@/shared/utils/errorUtils')
vi.mock('@/shared/utils/menu')
vi.mock('@/features/auth/authSlice')
vi.mock('@/features/form/formSlice')
vi.mock('@/features/makeupBags/hooks/usePDFExport')
vi.mock('@/features/makeupBags/makeupBagsApi')
vi.mock('@/features/stages/components/Stages')
vi.mock('@/features/tools/components/Tools')

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

            const category = `categories.${mockCategory1.name}.full`
            const client = mockMakeupBag1.client?.username || ''
            const mockFilename = generatePdfFilename(category, client)

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
