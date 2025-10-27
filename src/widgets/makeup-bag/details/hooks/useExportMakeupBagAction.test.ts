import { act, renderHook } from '@testing-library/react'
import toast from 'react-hot-toast'
import { useLocation, useParams } from 'react-router-dom'
import {
    afterAll,
    beforeAll,
    beforeEach,
    describe,
    expect,
    it,
    Mock,
    vi,
} from 'vitest'

import { mockMakeupBag1 } from '@/features/makeup-bags/api/__mocks__/makeupBagsApi'
import {
    useDeleteMakeupBagByIdMutation,
    useGetMakeupBagByIdQuery,
} from '@/features/makeup-bags/api/makeupBagsApi'
import {
    mockExportToPDF,
    usePDFExport,
} from '@/features/makeup-bags/hooks/pdf/__mocks__/usePDFExport'
import { ROUTES } from '@/shared/config/routes'
import { mockError } from '@/tests/mocks'
import { mockLocation } from '@/tests/mocks/router'
import { useExportMakeupBagAction } from './useExportMakeupBagAction'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/makeup-bags/hooks/pdf/usePDFExport')
vi.mock('@/features/makeup-bags/api/makeupBagsApi')
vi.mock('@/features/makeup-bags/utils/pdf/generatePdfFilename')
vi.mock('@/shared/components/common/spinner-button/SpinnerButton')

describe('useExportMakeupBagAction', () => {
    const mockDeleteMakeupBagById = vi.fn()
    const mockDeleteUnwrap = vi.fn()

    const spyConsoleError = vi.spyOn(console, 'error')

    vi.mocked(useLocation).mockReturnValue({
        ...mockLocation,
        pathname: ROUTES.backstage.makeupBags.details(
            '123456789012345678901234'
        ),
    })

    beforeAll(() => {
        spyConsoleError.mockImplementation(() => {})
    })

    beforeEach(() => {
        vi.mocked(useDeleteMakeupBagByIdMutation as Mock).mockReturnValue([
            mockDeleteMakeupBagById,
            { isLoading: false },
        ])

        mockDeleteMakeupBagById.mockReturnValue({ unwrap: mockDeleteUnwrap })

        vi.mocked(useGetMakeupBagByIdQuery as Mock).mockReturnValue({
            data: mockMakeupBag1,
            isLoading: false,
            error: null,
        })
    })

    afterAll(() => {
        spyConsoleError.mockRestore()
    })

    it('handles export success', async () => {
        const { result } = renderHook(() => useExportMakeupBagAction())

        const exportAction = result.current

        expect(exportAction).toBeDefined()

        await act(async () => {
            await exportAction!.onClick()
        })

        expect(mockExportToPDF).toHaveBeenCalled()
    })

    it('disables export when exporting', () => {
        const { result, rerender } = renderHook(() =>
            useExportMakeupBagAction()
        )

        result.current?.onClick()

        rerender()

        const exportAction = result.current
        expect(exportAction?.className).toContain('opacity-50')
    })

    it('handles export error', async () => {
        vi.mocked(usePDFExport as Mock).mockReturnValue({
            exportToPDF: vi.fn().mockRejectedValue(mockError),
            error: mockError.message,
            clearError: vi.fn(),
        })

        const { result } = renderHook(() => useExportMakeupBagAction())

        const exportAction = result.current

        await act(async () => {
            await exportAction!.onClick()
        })

        expect(mockExportToPDF).not.toHaveBeenCalled()
    })

    it('does throw toast error when data is null', async () => {
        vi.mocked(useGetMakeupBagByIdQuery as Mock).mockReturnValue({
            data: null,
            isLoading: false,
            error: null,
        })

        const { result } = renderHook(() => useExportMakeupBagAction())

        const exportAction = result.current

        expect(exportAction).toBeDefined()

        await act(async () => {
            await exportAction!.onClick()
        })

        expect(toast.error).toHaveBeenCalledWith('toast.noExportData')
    })

    it('does throw toast error when data is null', async () => {
        vi.mocked(useGetMakeupBagByIdQuery as Mock).mockReturnValue({
            data: null,
            isLoading: false,
            error: null,
        })

        const { result } = renderHook(() => useExportMakeupBagAction())

        const exportAction = result.current

        expect(exportAction).toBeDefined()

        await act(async () => {
            await exportAction!.onClick()
        })

        expect(toast.error).toHaveBeenCalledWith('toast.noExportData')
    })

    it('returns null if no id is provided', () => {
        vi.mocked(useParams).mockReturnValue({})
        const { result } = renderHook(() => useExportMakeupBagAction())
        expect(result.current).toEqual(null)
    })
})
