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
import { mockError } from '@/tests/mocks'
import { mockLocation } from '@/tests/mocks/router'
import { useDuplicateStageAction } from './useDuplicateStageAction'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/stages/api/stagesApi')

describe('useDuplicateStageAction', () => {
    const mockDelete = vi.fn()
    const mockDeleteUnwrap = vi.fn()
    const mockDuplicate = vi.fn()
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
            mockDelete,
            { isLoading: false },
        ])

        mockDelete.mockReturnValue({ unwrap: mockDeleteUnwrap })

        vi.mocked(useDuplicateStageByIdMutation as Mock).mockReturnValue([
            mockDuplicate,
        ])

        mockDuplicate.mockReturnValue({ unwrap: mockDuplicateUnwrap })
    })

    afterAll(() => {
        spyConsoleError.mockRestore()
    })

    it('returns correct number of actions', () => {
        const { result } = renderHook(() => useDuplicateStageAction())
        expect(result.current).toHaveLength(4)
    })

    it('handles duplicate action', async () => {
        const { result } = renderHook(() => useDuplicateStageAction())

        const duplicateAction = result.current

        const { onConfirm } = duplicateAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDuplicateUnwrap).toHaveBeenCalled()
    })

    it('shows error toast if duplicate fails', async () => {
        mockDuplicateUnwrap.mockRejectedValue(mockError)

        const { result } = renderHook(() => useDuplicateStageAction())

        const duplicateAction = result.current

        const { onConfirm } = duplicateAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDuplicate).toHaveBeenCalledWith('123')
        expect(toast.error).toHaveBeenCalledWith('UNKNOWN_ERROR')
    })

    it('returns empty array if no id is provided', () => {
        vi.mocked(useParams).mockReturnValue({})
        const { result } = renderHook(() => useDuplicateStageAction())
        expect(result.current).toEqual([])
    })
})
