import { mockNavigate } from '@/tests/mocks/router'
import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useBackAction } from './useBackAction'

vi.mock('@/app/hooks/hooks')

describe('useBackAction', () => {
    it('returns mapped action with correct label and icon', () => {
        const { result } = renderHook(() => useBackAction())
        const action = result.current

        expect(action.key).toBe('back')
        expect(action.label).toBe('actions.back')
        expect(action.icon).toBeDefined()
        expect(typeof action.onClick).toBe('function')
    })

    it('calls navigate on back click', () => {
        const { result } = renderHook(() => useBackAction())

        result.current.onClick()

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })
})
