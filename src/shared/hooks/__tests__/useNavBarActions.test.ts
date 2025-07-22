import { renderHook } from '@testing-library/react'
import { describe, expect, it, Mock, vi } from 'vitest'

import { useMakeupBagDetailsActions } from '@/pages/makeup-bags/details/hooks/useMakeupBagDetailsActions'
import { useMakeupBagListActions } from '@/pages/makeup-bags/list/hooks/useMakeupBagListActions'
import { useBackActions } from '@/shared/hooks/useBackActions'
import { mockLocation } from '@/tests/mocks/router'
import { useLocation } from 'react-router-dom'
import { mockActionAdd, mockActionBack } from '../__mocks__/useNavBarActions'
import { useNavBarActions } from '../useNavBarActions'

vi.mock('@/app/hooks')
vi.mock('@/pages/makeup-bags/add/hooks/useBackActions')
vi.mock('@/pages/makeup-bags/details/hooks/useMakeupBagDetailsActions')
vi.mock('@/pages/makeup-bags/list/hooks/useMakeupBagListActions')
vi.mock('@/shared/api/axiosClient.config')
vi.mock('@/shared/hooks/useBackActions')
vi.mock('@/shared/utils/menu')

describe('useNavBarActions', () => {
    it('returns actions on /makeup-bags', () => {
        vi.mocked(useLocation).mockReturnValue({
            ...mockLocation,
            pathname: '/makeup-bags',
        })

        vi.mocked(useMakeupBagListActions as Mock).mockReturnValue([
            mockActionAdd,
        ])

        const { result } = renderHook(() => useNavBarActions())

        expect(result.current).toEqual([mockActionAdd])
    })

    it('returns actions on /makeup-bags/:id', () => {
        vi.mocked(useLocation).mockReturnValue({
            ...mockLocation,
            pathname: '/makeup-bags/123456789012345678901234',
        })

        vi.mocked(useMakeupBagDetailsActions as Mock).mockReturnValue([
            mockActionBack,
        ])

        const { result } = renderHook(() => useNavBarActions())

        expect(result.current).toEqual([mockActionBack])
    })

    it('returns actions on /makeup-bags/add', () => {
        vi.mocked(useLocation).mockReturnValue({
            ...mockLocation,
            pathname: '/makeup-bags/add',
        })

        vi.mocked(useBackActions as Mock).mockReturnValue([mockActionBack])

        const { result } = renderHook(() => useNavBarActions())

        expect(result.current).toEqual([mockActionBack])
    })

    it('returns empty array for unrelated route', () => {
        vi.mocked(useLocation).mockReturnValue(mockLocation)

        const { result } = renderHook(() => useNavBarActions())

        expect(result.current).toEqual([])
    })
})
