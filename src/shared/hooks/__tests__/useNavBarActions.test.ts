import { renderHook } from '@testing-library/react'
import { describe, expect, it, Mock, vi } from 'vitest'

import { useMakeupBagDetailsActions } from '@/pages/makeup-bag/details/hooks/useMakeupBagDetailsActions'
import { useMakeupBagListActions } from '@/pages/makeup-bag/list/hooks/useMakeupBagListActions'
import { mockLocation } from '@/tests/mocks/router'
import { useLocation } from 'react-router-dom'
import { mockActionAdd, mockActionBack } from '../__mocks__/useNavBarActions'
import { useNavBarActions } from '../useNavBarActions'

vi.mock('@/app/hooks')
vi.mock('@/pages/makeup-bag/details/hooks/useMakeupBagDetailsActions')
vi.mock('@/pages/makeup-bag/list/hooks/useMakeupBagListActions')
vi.mock('@/shared/utils/menu')
vi.mock('../../api/axiosClient.config')

describe('useNavBarActions', () => {
    it('returns makeupBagListActions on /makeup-bag/list', () => {
        vi.mocked(useLocation).mockReturnValue({
            ...mockLocation,
            pathname: '/makeup-bag/list',
        })

        vi.mocked(useMakeupBagListActions as Mock).mockReturnValue([
            mockActionAdd,
        ])

        const { result } = renderHook(() => useNavBarActions())

        expect(result.current).toEqual([mockActionAdd])
    })

    it('returns makeupBagActions on /makeup-bag/:id', () => {
        vi.mocked(useLocation).mockReturnValue({
            ...mockLocation,
            pathname: '/makeup-bag/123456789012345678901234',
        })

        vi.mocked(useMakeupBagDetailsActions as Mock).mockReturnValue([
            mockActionBack,
        ])

        const { result } = renderHook(() => useNavBarActions())

        expect(result.current).toEqual([mockActionBack])
    })

    it('returns empty array for unrelated route', () => {
        vi.mocked(useLocation).mockReturnValue(mockLocation)

        const { result } = renderHook(() => useNavBarActions())

        expect(result.current).toEqual([])
    })
})
