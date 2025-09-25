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
import { mockExportToPDF } from '@/features/makeup-bags/hooks/pdf/__mocks__/usePDFExport'
import { usePDFExport } from '@/features/makeup-bags/hooks/pdf/usePDFExport'
import { mockError } from '@/tests/mocks'
import { mockLocation, mockNavigate } from '@/tests/mocks/router'
import { useMakeupBagDetailsActions } from './useMakeupBagDetailsActions'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/makeup-bags/hooks/pdf/usePDFExport')
vi.mock('@/features/makeup-bags/api/makeupBagsApi')
vi.mock('@/features/makeup-bags/utils/pdf/generatePdfFilename')
vi.mock('@/shared/components/common/spinner-button/SpinnerButton')

describe('useMakeupBagDetailsActions', () => {
    const mockDeleteMakeupBagById = vi.fn()
    const mockDeleteUnwrap = vi.fn()

    const spyConsoleError = vi.spyOn(console, 'error')

    vi.mocked(useLocation).mockReturnValue({
        ...mockLocation,
        pathname: '/makeup-bags/123456789012345678901234',
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

    it('returns correct number of actions', () => {
        const { result } = renderHook(() => useMakeupBagDetailsActions())
        expect(result.current).toHaveLength(4)
    })

    it('handles export success', async () => {
        const { result } = renderHook(() => useMakeupBagDetailsActions())

        const exportAction = result.current.find(
            (action) => action.key === 'export'
        )

        expect(exportAction).toBeDefined()

        await act(async () => {
            await exportAction!.onClick()
        })

        expect(mockExportToPDF).toHaveBeenCalled()
    })

    it('disables export when exporting', () => {
        const { result, rerender } = renderHook(() =>
            useMakeupBagDetailsActions()
        )

        result.current.find((a) => a.key === 'export')?.onClick()

        rerender()

        const exportAction = result.current.find((a) => a.key === 'export')
        expect(exportAction?.className).toContain('opacity-50')
    })

    it('handles export error', async () => {
        vi.mocked(usePDFExport as Mock).mockReturnValue({
            exportToPDF: vi.fn().mockRejectedValue(mockError),
            error: mockError.message,
            clearError: vi.fn(),
        })

        const { result } = renderHook(() => useMakeupBagDetailsActions())

        const exportAction = result.current.find(
            (action) => action.key === 'export'
        )

        await act(async () => {
            await exportAction!.onClick()
        })

        expect(mockExportToPDF).not.toHaveBeenCalled()
    })

    it('handles delete action', async () => {
        const { result } = renderHook(() => useMakeupBagDetailsActions())

        const deleteAction = result.current.find(
            (action) => action.key === 'delete'
        )

        const { onConfirm } = deleteAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDeleteUnwrap).toHaveBeenCalled()
    })

    it('shows error toast if delete fails', async () => {
        mockDeleteUnwrap.mockRejectedValue(mockError)

        const { result } = renderHook(() => useMakeupBagDetailsActions())

        const deleteAction = result.current.find(
            (action) => action.key === 'delete'
        )

        const { onConfirm } = deleteAction?.modalProps || {}

        act(() => {
            onConfirm?.()
        })

        expect(mockDeleteMakeupBagById).toHaveBeenCalledWith('123')
        expect(toast.error).toHaveBeenCalledWith(mockError.message)
    })

    it('handles back action', async () => {
        const { result } = renderHook(() => useMakeupBagDetailsActions())

        const backAction = result.current.find(
            (action) => action.key === 'back'
        )

        expect(backAction).toBeDefined()

        await act(async () => {
            await backAction!.onClick()
        })

        expect(mockNavigate).toHaveBeenCalledWith('/makeup-bags', {
            replace: true,
            state: { scrollId: '123' },
        })
    })

    it('does throw toast error when data is null', async () => {
        vi.mocked(useGetMakeupBagByIdQuery as Mock).mockReturnValue({
            data: null,
            isLoading: false,
            error: null,
        })

        const { result } = renderHook(() => useMakeupBagDetailsActions())

        const exportAction = result.current.find(
            (action) => action.key === 'export'
        )

        expect(exportAction).toBeDefined()

        await act(async () => {
            await exportAction!.onClick()
        })

        expect(toast.error).toHaveBeenCalledWith('toast.noExportData')
    })

    it('returns empty array if no id is provided', () => {
        vi.mocked(useParams).mockReturnValue({})
        const { result } = renderHook(() => useMakeupBagDetailsActions())
        expect(result.current).toEqual([])
    })
})
