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

import { mockStage1 } from '@/features/stages/api/__mocks__/stagesApi'
import {
    useDeleteStageByIdMutation,
    useDuplicateStageByIdMutation,
    useGetStageByIdQuery,
} from '@/features/stages/api/stagesApi'
import { mockError } from '@/shared/utils/error/__mocks__/getErrorMessage'
import { mockLocation, mockNavigate } from '@/tests/mocks/router'
import { useStageDetailsActions } from './useStageDetailsActions'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/stages/api/stagesApi')
vi.mock('@/shared/utils/error/getErrorMessage')

describe('useStageDetailsActions', () => {
    const mockDeleteStage = vi.fn()
    const mockDeleteUnwrap = vi.fn()
    const mockDuplicateStage = vi.fn()
    const mockDuplicateUnwrap = vi.fn()

    const spyConsoleError = vi.spyOn(console, 'error')

    vi.mocked(useLocation).mockReturnValue({
        ...mockLocation,
        pathname: '/stages/123456789012345678901234',
    })

    beforeAll(() => {
        spyConsoleError.mockImplementation(() => {})
    })

    beforeEach(() => {
        vi.mocked(useGetStageByIdQuery as Mock).mockReturnValue({
            data: mockStage1,
            isLoading: false,
            error: null,
        })

        vi.mocked(useDeleteStageByIdMutation as Mock).mockReturnValue([
            mockDeleteStage,
            { isLoading: false },
        ])

        mockDeleteStage.mockReturnValue({ unwrap: mockDeleteUnwrap })

        vi.mocked(useDuplicateStageByIdMutation as Mock).mockReturnValue([
            mockDuplicateStage,
        ])

        mockDuplicateStage.mockReturnValue({ unwrap: mockDuplicateUnwrap })
    })

    afterAll(() => {
        spyConsoleError.mockRestore()
    })

    it('returns correct number of actions', () => {
        const { result } = renderHook(() => useStageDetailsActions())
        expect(result.current).toHaveLength(4)
    })

    it('handles back action', async () => {
        const { result } = renderHook(() => useStageDetailsActions())

        const backAction = result.current.find(
            (action) => action.key === 'back'
        )

        expect(backAction).toBeDefined()

        await act(async () => {
            await backAction!.onClick()
        })

        expect(mockNavigate).toHaveBeenCalledWith('/stages', {
            replace: true,
            state: { scrollId: '123' },
        })
    })

    it('handles duplicate action', async () => {
        const { result } = renderHook(() => useStageDetailsActions())

        const duplicateAction = result.current.find(
            (a) => a.key === 'duplicate'
        )

        const { onConfirm } = duplicateAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDuplicateUnwrap).toHaveBeenCalled()
    })

    it('shows error toast if duplicate fails', async () => {
        mockDuplicateUnwrap.mockRejectedValue(mockError)

        const { result } = renderHook(() => useStageDetailsActions())

        const duplicateAction = result.current.find(
            (action) => action.key === 'duplicate'
        )

        const { onConfirm } = duplicateAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDuplicateStage).toHaveBeenCalledWith('123')
        expect(toast.error).toHaveBeenCalledWith(mockError.message)
    })

    it('handles delete action', async () => {
        const { result } = renderHook(() => useStageDetailsActions())

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

        const { result } = renderHook(() => useStageDetailsActions())

        const deleteAction = result.current.find(
            (action) => action.key === 'delete'
        )

        const { onConfirm } = deleteAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDeleteStage).toHaveBeenCalledWith('123')
        expect(toast.error).toHaveBeenCalledWith(mockError.message)
    })

    it('returns empty array if no id is provided', () => {
        vi.mocked(useParams).mockReturnValue({})
        const { result } = renderHook(() => useStageDetailsActions())
        expect(result.current).toEqual([])
    })
})
