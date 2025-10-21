import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockNavigate } from '@/tests/mocks/router'
import { useAddAction } from './useAddAction'

vi.mock('@/app/hooks/hooks')

describe('useAddAction', () => {
    it('returns mapped action with correct label and icon', () => {
        const { result } = renderHook(() => useAddAction())
        const action = result.current

        expect(action.key).toBe('add')
        expect(action.label).toBe('actions.add')
        expect(action.icon).toBeDefined()
        expect(typeof action.onClick).toBe('function')
    })

    it('calls navigate on add click', () => {
        const { result } = renderHook(() => useAddAction())
        result.current.onClick()
        expect(mockNavigate).toHaveBeenCalledWith('add')
    })
})
