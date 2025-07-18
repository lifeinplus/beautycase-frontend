import { renderHook } from '@testing-library/react'
import { describe, expect, it, Mock, vi } from 'vitest'

import { useMakeupBagActions } from '@/pages/makeup-bag/hooks/useMakeupBagActions'
import { useMakeupBagListActions } from '@/pages/makeup-bag/hooks/useMakeupBagListActions'
import { mockLocation } from '@/tests/mocks/router'
import { useLocation } from 'react-router-dom'
import { mockActionAdd, mockActionBack } from '../__mocks__/useNavBarActions'
import { useNavBarActions } from '../useNavBarActions'

vi.mock('@/app/hooks')
vi.mock('@/pages/makeup-bag/hooks/useMakeupBagActions')
vi.mock('@/pages/makeup-bag/hooks/useMakeupBagListActions')
vi.mock('@/shared/utils/menu')
vi.mock('../../api/axiosClient.config')

describe('useNavBarActions', () => {
    it('returns makeupBagListActions on /makeup_bags', () => {
        vi.mocked(useLocation).mockReturnValue({
            ...mockLocation,
            pathname: '/makeup_bags',
        })

        vi.mocked(useMakeupBagListActions as Mock).mockReturnValue([
            mockActionAdd,
        ])

        const { result } = renderHook(() => useNavBarActions())

        expect(result.current).toEqual([mockActionAdd])
    })

    it('returns makeupBagActions on /makeup_bags/:id', () => {
        vi.mocked(useLocation).mockReturnValue({
            ...mockLocation,
            pathname: '/makeup_bags/123456789012345678901234',
        })

        vi.mocked(useMakeupBagActions as Mock).mockReturnValue([mockActionBack])

        const { result } = renderHook(() => useNavBarActions())

        expect(result.current).toEqual([mockActionBack])
    })

    it('returns empty array for unrelated route', () => {
        vi.mocked(useLocation).mockReturnValue(mockLocation)

        const { result } = renderHook(() => useNavBarActions())

        expect(result.current).toEqual([])
    })
})
