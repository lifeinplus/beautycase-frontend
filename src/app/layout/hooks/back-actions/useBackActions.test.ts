import { mockNavigate } from '@/tests/mocks/router'
import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useBackActions } from './useBackActions'

vi.mock('@/app/hooks/hooks')

describe('useBackActions', () => {
    it('returns mapped action with correct label and icon', () => {
        const { result } = renderHook(() => useBackActions())
        const actions = result.current

        expect(actions).toHaveLength(1)

        const action = actions[0]
        expect(action.key).toBe('back')
        expect(action.label).toBe('actions.back')
        expect(action.icon).toBeDefined()
        expect(typeof action.onClick).toBe('function')
    })

    it('calls navigate on back click', () => {
        const { result } = renderHook(() => useBackActions())

        result.current[0].onClick()

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })
})
