import { mockNavigate } from '@/tests/mocks/router'
import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useMakeupBagListActions } from './useMakeupBagListActions'

vi.mock('@/app/hooks')

describe('useMakeupBagListActions', () => {
    it('returns mapped action with correct label and icon', () => {
        const { result } = renderHook(() => useMakeupBagListActions())
        const actions = result.current

        expect(actions).toHaveLength(1)

        const action = actions[0]
        expect(action.key).toBe('add')
        expect(action.label).toBe('navigation:actions.add')
        expect(action.icon).toBeDefined()
        expect(typeof action.onClick).toBe('function')
    })

    it('calls navigate on add click', () => {
        const { result } = renderHook(() => useMakeupBagListActions())

        const action = result.current[0]
        action.onClick()

        expect(mockNavigate).toHaveBeenCalledWith('add')
    })
})
