import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockNavigate } from '@/tests/mocks/router'
import { useProductCategoryActions } from './useProductCategoryActions'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/products/api/productsApi')

describe('useProductCategoryActions', () => {
    it('returns correct number of actions', () => {
        const { result } = renderHook(() => useProductCategoryActions())
        expect(result.current).toHaveLength(2)
    })

    it('handles back action', async () => {
        const { result } = renderHook(() => useProductCategoryActions())

        const backAction = result.current.find(
            (action) => action.key === 'back'
        )

        expect(backAction).toBeDefined()

        await act(async () => {
            await backAction!.onClick()
        })

        expect(mockNavigate).toHaveBeenCalledWith('/products')
    })
})
