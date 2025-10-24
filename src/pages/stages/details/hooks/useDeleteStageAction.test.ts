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
import { mockError } from '@/tests/mocks'
import { mockLocation } from '@/tests/mocks/router'
import { useDeleteStageAction } from './useDeleteStageAction'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/makeup-bags/hooks/pdf/usePDFExport')
vi.mock('@/features/makeup-bags/api/makeupBagsApi')
vi.mock('@/features/makeup-bags/utils/pdf/generatePdfFilename')
vi.mock('@/shared/components/common/spinner-button/SpinnerButton')

describe('useDeleteStageAction', () => {
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
        const { result } = renderHook(() => useDeleteStageAction())
        expect(result.current).toHaveLength(4)
    })

    it('handles delete action', async () => {
        const { result } = renderHook(() => useDeleteStageAction())

        const deleteAction = result.current

        const { onConfirm } = deleteAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDeleteUnwrap).toHaveBeenCalled()
    })

    it('shows error toast if delete fails', async () => {
        mockDeleteUnwrap.mockRejectedValue(mockError)

        const { result } = renderHook(() => useDeleteStageAction())

        const deleteAction = result.current

        const { onConfirm } = deleteAction?.modalProps || {}

        act(() => {
            onConfirm?.()
        })

        expect(mockDeleteMakeupBagById).toHaveBeenCalledWith('123')
        expect(toast.error).toHaveBeenCalledWith(mockError.message)
    })

    it('returns empty array if no id is provided', () => {
        vi.mocked(useParams).mockReturnValue({})
        const { result } = renderHook(() => useDeleteStageAction())
        expect(result.current).toEqual([])
    })
})
