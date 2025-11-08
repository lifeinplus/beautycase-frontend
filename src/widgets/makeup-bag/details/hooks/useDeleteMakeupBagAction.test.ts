import { act, renderHook } from '@testing-library/react'
import toast from 'react-hot-toast'
import { useLocation, useParams } from 'react-router-dom'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockMakeupBag1 } from '@/features/makeup-bags/api/__mocks__/makeupBagsApi'
import {
    useDeleteMakeupBagByIdMutation,
    useGetMakeupBagByIdQuery,
} from '@/features/makeup-bags/api/makeupBagsApi'
import { ROUTES } from '@/shared/config/routes'
import { mockError } from '@/tests/mocks'
import { mockLocation } from '@/tests/mocks/router'
import { useDeleteMakeupBagAction } from './useDeleteMakeupBagAction'
import { useExportMakeupBagAction } from './useExportMakeupBagAction'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/makeup-bags/hooks/pdf/usePDFExport')
vi.mock('@/features/makeup-bags/api/makeupBagsApi')
vi.mock('@/features/makeup-bags/utils/pdf/generatePdfFilename')
vi.mock('@/shared/components/common/spinner-button/SpinnerButton')

describe('useDeleteMakeupBagAction', () => {
    const mockDeleteMakeupBagById = vi.fn()
    const mockDeleteUnwrap = vi.fn()

    vi.mocked(useLocation).mockReturnValue({
        ...mockLocation,
        pathname: ROUTES.backstage.makeupBags.details(
            '123456789012345678901234'
        ),
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

    it('handles delete action', async () => {
        const { result } = renderHook(() => useDeleteMakeupBagAction())

        const deleteAction = result.current

        const { onConfirm } = deleteAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDeleteUnwrap).toHaveBeenCalled()
    })

    it('shows error toast if delete fails', async () => {
        mockDeleteUnwrap.mockRejectedValue(mockError)

        const { result } = renderHook(() => useDeleteMakeupBagAction())

        const deleteAction = result.current

        const { onConfirm } = deleteAction?.modalProps || {}

        act(() => {
            onConfirm?.()
        })

        expect(mockDeleteMakeupBagById).toHaveBeenCalledWith('123')
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
        const { result } = renderHook(() => useDeleteMakeupBagAction())
        expect(result.current).toEqual(null)
    })
})
