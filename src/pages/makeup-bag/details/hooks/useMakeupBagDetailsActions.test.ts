import { act, renderHook } from '@testing-library/react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
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

import { mockMakeupBag1 } from '@/features/makeupBags/__mocks__/makeupBagsApi'
import { mockExportToPDF } from '@/features/makeupBags/hooks/__mocks__/usePDFExport'
import { usePDFExport } from '@/features/makeupBags/hooks/usePDFExport'
import {
    useDeleteMakeupBagByIdMutation,
    useGetMakeupBagByIdQuery,
} from '@/features/makeupBags/makeupBagsApi'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { mockNavigate } from '@/tests/mocks/router'
import { useMakeupBagDetailsActions } from './useMakeupBagDetailsActions'

vi.mock('@/app/hooks')
vi.mock('@/features/form/formSlice')
vi.mock('@/features/makeupBags/hooks/usePDFExport')
vi.mock('@/features/makeupBags/makeupBagsApi')
vi.mock('@/features/makeupBags/utils/generatePdfFilename')
vi.mock('@/shared/components/common/SpinnerButton')
vi.mock('@/shared/utils/errorUtils')

describe('useMakeupBagDetailsActions', () => {
    const mockDeleteMakeupBagById = vi.fn()
    const mockDeleteUnwrap = vi.fn()

    const spyConsoleError = vi.spyOn(console, 'error')

    beforeAll(() => {
        spyConsoleError.mockImplementation(() => {})
    })

    beforeEach(() => {
        vi.mocked(useDeleteMakeupBagByIdMutation as Mock).mockReturnValue([
            mockDeleteMakeupBagById,
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

    it('disables export when exporting', () => {
        const { result, rerender } = renderHook(() =>
            useMakeupBagDetailsActions()
        )

        result.current.find((a) => a.key === 'export')?.onClick()

        rerender()

        const exportAction = result.current.find((a) => a.key === 'export')
        expect(exportAction?.className).toContain('opacity-50')
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

        await act(async () => {
            await onConfirm?.()
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

        expect(mockNavigate).toHaveBeenCalledWith('/makeup-bag/list', {
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
