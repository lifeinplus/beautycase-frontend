import { act, renderHook } from '@testing-library/react'
import { useLocation, useParams } from 'react-router-dom'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockMakeupBagQuestionnaire1 } from '@/features/questionnaires/api/__mocks__/questionnairesApi'
import {
    useDeleteMakeupBagQuestionnaireByIdMutation,
    useGetMakeupBagQuestionnaireByIdQuery,
} from '@/features/questionnaires/api/questionnairesApi'
import { ROUTES } from '@/shared/config/routes'
import { mockError } from '@/tests/mocks'
import { mockLocation, mockNavigate } from '@/tests/mocks/router'
import { useDeleteMakeupBagQuestionnaireAction } from './useDeleteMakeupBagQuestionnaireAction'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/questionnaires/api/questionnairesApi')

describe('useDeleteMakeupBagQuestionnaireAction', () => {
    const mockDeleteMakeupBagQuestionnaireById = vi.fn()
    const mockDeleteUnwrap = vi.fn()

    vi.mocked(useLocation).mockReturnValue({
        ...mockLocation,
        pathname: ROUTES.questionnaires.makeupBags.result(
            '123456789012345678901234'
        ),
    })

    beforeEach(() => {
        vi.mocked(
            useDeleteMakeupBagQuestionnaireByIdMutation as Mock
        ).mockReturnValue([
            mockDeleteMakeupBagQuestionnaireById,
            { isLoading: false },
        ])

        mockDeleteMakeupBagQuestionnaireById.mockReturnValue({
            unwrap: mockDeleteUnwrap,
        })

        vi.mocked(
            useGetMakeupBagQuestionnaireByIdQuery as Mock
        ).mockReturnValue({
            data: mockMakeupBagQuestionnaire1,
            isLoading: false,
            error: null,
        })
    })

    it('handles delete action', async () => {
        const { result } = renderHook(() =>
            useDeleteMakeupBagQuestionnaireAction()
        )

        let deleteAction = result.current

        act(() => {
            deleteAction?.onClick()
        })

        deleteAction = result.current
        const { onConfirm } = deleteAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDeleteUnwrap).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith(
            ROUTES.questionnaires.makeupBags.root
        )
    })

    it('shows error toast if delete fails', async () => {
        mockDeleteUnwrap.mockRejectedValue(mockError)

        const { result } = renderHook(() =>
            useDeleteMakeupBagQuestionnaireAction()
        )

        let deleteAction = result.current

        act(() => {
            deleteAction?.onClick()
        })

        deleteAction = result.current
        const { onConfirm } = deleteAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDeleteMakeupBagQuestionnaireById).toHaveBeenCalledWith('123')
    })

    it('returns null if no id is provided', () => {
        vi.mocked(useParams).mockReturnValue({})
        const { result } = renderHook(() =>
            useDeleteMakeupBagQuestionnaireAction()
        )
        expect(result.current).toEqual(null)
    })
})
