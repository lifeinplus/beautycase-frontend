import { act, renderHook } from '@testing-library/react'
import { useLocation, useParams } from 'react-router-dom'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockTool1 } from '@/features/tools/api/__mocks__/toolsApi'
import {
    useDeleteToolByIdMutation,
    useGetToolByIdQuery,
} from '@/features/tools/api/toolsApi'
import { ROUTES } from '@/shared/config/routes'
import { mockError } from '@/tests/mocks'
import { mockLocation, mockNavigate } from '@/tests/mocks/router'
import { useDeleteToolAction } from './useDeleteToolAction'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/tools/api/toolsApi')

describe('useDeleteToolAction', () => {
    const mockDeleteToolById = vi.fn()
    const mockDeleteUnwrap = vi.fn()

    vi.mocked(useLocation).mockReturnValue({
        ...mockLocation,
        pathname: ROUTES.backstage.tools.details('123456789012345678901234'),
    })

    beforeEach(() => {
        vi.mocked(useDeleteToolByIdMutation as Mock).mockReturnValue([
            mockDeleteToolById,
            { isLoading: false },
        ])

        mockDeleteToolById.mockReturnValue({ unwrap: mockDeleteUnwrap })

        vi.mocked(useGetToolByIdQuery as Mock).mockReturnValue({
            data: mockTool1,
            isLoading: false,
            error: null,
        })
    })

    it('handles delete action', async () => {
        const { result } = renderHook(() => useDeleteToolAction())

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
        expect(mockNavigate).toHaveBeenCalledWith(ROUTES.backstage.tools.root)
    })

    it('closes modal when cancel is called', async () => {
        const { result } = renderHook(() => useDeleteToolAction())

        let deleteAction = result.current

        await act(async () => {
            await deleteAction?.onClick()
        })

        deleteAction = result.current
        const { onCancel } = deleteAction?.modalProps || {}

        await act(async () => {
            await onCancel?.()
        })

        const updatedDeleteAction = result.current
        expect(updatedDeleteAction?.modalProps?.isOpen).toBe(false)
    })

    it('shows error toast if delete fails', async () => {
        mockDeleteUnwrap.mockRejectedValue(mockError)

        const { result } = renderHook(() => useDeleteToolAction())

        let deleteAction = result.current

        act(() => {
            deleteAction?.onClick()
        })

        deleteAction = result.current
        const { onConfirm } = deleteAction?.modalProps || {}

        await act(async () => {
            await onConfirm?.()
        })

        expect(mockDeleteToolById).toHaveBeenCalledWith('123')
    })

    it('returns null if no id is provided', () => {
        vi.mocked(useParams).mockReturnValue({})
        const { result } = renderHook(() => useDeleteToolAction())
        expect(result.current).toEqual(null)
    })
})
