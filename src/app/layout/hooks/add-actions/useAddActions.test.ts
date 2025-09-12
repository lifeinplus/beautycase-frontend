import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockNavigate } from '@/tests/mocks/router'
import { useAddActions } from './useAddActions'

vi.mock('@/app/hooks/hooks')

describe('useAddActions', () => {
    it('returns mapped action with correct label and icon', () => {
        const { result } = renderHook(() => useAddActions())
        const actions = result.current

        expect(actions).toHaveLength(1)

        const action = actions[0]
        expect(action.key).toBe('add')
        expect(action.label).toBe('actions.add')
        expect(action.icon).toBeDefined()
        expect(typeof action.onClick).toBe('function')
    })

    it('calls navigate on add click', () => {
        const { result } = renderHook(() => useAddActions())
        result.current[0].onClick()
        expect(mockNavigate).toHaveBeenCalledWith('add')
    })
})
