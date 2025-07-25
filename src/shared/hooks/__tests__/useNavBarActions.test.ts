import { renderHook } from '@testing-library/react'
import { useLocation } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { mockLocation } from '@/tests/mocks/router'
import { useNavBarActions } from '../useNavBarActions'

vi.mock('@/app/hooks')
vi.mock('@/features/auth/authSlice')
vi.mock('@/pages/lessons/details/hooks/useLessonDetailsActions')
vi.mock('@/pages/makeup-bags/details/hooks/useMakeupBagDetailsActions')
vi.mock('@/pages/products/details/hooks/useProductDetailsActions')
vi.mock('@/shared/hooks/useAddActions')
vi.mock('@/shared/hooks/useBackActions')
vi.mock('@/shared/utils/menu')

describe('useNavBarActions', () => {
    describe('lessonRoutes', () => {
        it('returns actions on /lessons', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/lessons',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('add')
        })

        it('returns actions on /lessons/:id', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/lessons/123456789012345678901234',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('edit')
        })

        it('returns actions on /lessons/:id/products', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/lessons/123456789012345678901234/products',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /lessons/add', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/lessons/add',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /lessons/add/clients', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/lessons/add/clients',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /lessons/edit/:id', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/lessons/edit/123456789012345678901234',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /lessons/edit/:id/clients', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/lessons/edit/123456789012345678901234/clients',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })
    })

    describe('makeupBagRoutes', () => {
        it('returns actions on /makeup-bags', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/makeup-bags',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('add')
        })

        it('returns actions on /makeup-bags/:id', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/makeup-bags/123456789012345678901234',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('edit')
        })

        it('returns actions on /makeup-bags/add', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/makeup-bags/add',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /makeup-bags/add/stages', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/makeup-bags/add/stages',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /makeup-bags/add/tools', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/makeup-bags/add/tools',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /makeup-bags/edit/:id', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/makeup-bags/edit/123456789012345678901234',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /makeup-bags/edit/:id/stages', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/makeup-bags/edit/123456789012345678901234/stages',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /makeup-bags/edit/:id/tools', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/makeup-bags/edit/123456789012345678901234/tools',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })
    })

    it('returns empty array for unrelated route', () => {
        vi.mocked(useLocation).mockReturnValue(mockLocation)
        const { result } = renderHook(() => useNavBarActions())
        expect(result.current).toEqual([])
    })
})
