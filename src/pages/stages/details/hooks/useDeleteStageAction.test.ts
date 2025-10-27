import { act, renderHook } from '@testing-library/react'
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
    useGetStageByIdQuery,
} from '@/features/stages/api/stagesApi'
import { ROUTES } from '@/shared/config/routes'
import { mockError } from '@/tests/mocks'
import { mockLocation } from '@/tests/mocks/router'
import { useDeleteStageAction } from './useDeleteStageAction'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/stages/hooks/pdf/usePDFExport')
vi.mock('@/features/stages/api/stagesApi')
vi.mock('@/features/stages/utils/pdf/generatePdfFilename')
vi.mock('@/shared/components/common/spinner-button/SpinnerButton')

describe('useDeleteStageAction', () => {
    const mockDeleteStageById = vi.fn()
    const mockDeleteUnwrap = vi.fn()

    const spyConsoleError = vi.spyOn(console, 'error')

    vi.mocked(useLocation).mockReturnValue({
        ...mockLocation,
        pathname: ROUTES.backstage.stages.details('123456789012345678901234'),
    })

    beforeAll(() => {
        spyConsoleError.mockImplementation(() => {})
    })

    beforeEach(() => {
        vi.mocked(useDeleteStageByIdMutation as Mock).mockReturnValue([
            mockDeleteStageById,
            { isLoading: false },
        ])

        mockDeleteStageById.mockReturnValue({ unwrap: mockDeleteUnwrap })

        vi.mocked(useGetStageByIdQuery as Mock).mockReturnValue({
            data: mockStage1,
            isLoading: false,
            error: null,
        })
    })

    afterAll(() => {
        spyConsoleError.mockRestore()
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

        expect(mockDeleteStageById).toHaveBeenCalledWith('123')
    })

    it('returns null if no id is provided', () => {
        vi.mocked(useParams).mockReturnValue({})
        const { result } = renderHook(() => useDeleteStageAction())
        expect(result.current).toEqual(null)
    })
})
