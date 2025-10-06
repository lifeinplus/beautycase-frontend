import { renderHook } from '@testing-library/react'
import { useLocation } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { mockLocation } from '@/tests/mocks/router'
import { useNavBarActions } from './useNavBarActions'

vi.mock('@/app/hooks/hooks')
vi.mock('@/app/layout/hooks/add-actions/useAddActions')
vi.mock('@/app/layout/hooks/back-actions/useBackActions')
vi.mock('@/features/auth/slice/authSlice')
vi.mock('@/pages/lessons/details/hooks/useLessonDetailsActions')
vi.mock('@/pages/makeup-bags/details/hooks/useMakeupBagDetailsActions')
vi.mock('@/pages/products/details/hooks/useProductDetailsActions')
vi.mock('@/pages/stages/details/hooks/useStageDetailsActions')
vi.mock('@/pages/tools/details/hooks/useToolDetailsActions')
vi.mock('@/shared/lib/access/canAccess')

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

        it('returns actions on /lessons/:id/edit', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/lessons/123456789012345678901234/edit',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /lessons/:id/edit/clients', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/lessons/123456789012345678901234/edit/clients',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
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

        it('returns actions on /makeup-bags/:id/edit', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/makeup-bags/123456789012345678901234/edit',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /makeup-bags/:id/edit/stages', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/makeup-bags/123456789012345678901234/edit/stages',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /makeup-bags/:id/edit/tools', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/makeup-bags/123456789012345678901234/edit/tools',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
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
    })

    describe('productRoutes', () => {
        it('returns actions on /products', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/products',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('add')
        })

        it('returns actions on /products/:id', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/products/123456789012345678901234',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('edit')
        })

        it('returns actions on /products/:id/edit', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/products/123456789012345678901234/edit',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /products/:id/links', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/products/123456789012345678901234/links',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /products/add', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/products/add',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })
    })

    describe('questionnaireRoutes', () => {
        it('returns actions on /questionnaires/makeup-bags/:id', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname:
                    '/questionnaires/makeup-bags/123456789012345678901234',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /questionnaires/trainings/:id', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/questionnaires/trainings/123456789012345678901234',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })
    })

    describe('referenceListRoutes', () => {
        it('returns actions on /reference-lists/brands', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/reference-lists/brands',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /reference-lists/stores', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/reference-lists/stores',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })
    })

    describe('stageRoutes', () => {
        it('returns actions on /stages', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/stages',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('add')
        })

        it('returns actions on /stages/:id', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/stages/123456789012345678901234',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('edit')
        })

        it('returns actions on /stages/:id/edit', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/stages/123456789012345678901234/edit',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /stages/:id/products', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/stages/123456789012345678901234/products',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /stages/add', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/stages/add',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })
    })

    describe('toolRoutes', () => {
        it('returns actions on /tools', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/tools',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('add')
        })

        it('returns actions on /tools/:id', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/tools/123456789012345678901234',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('edit')
        })

        it('returns actions on /tools/:id/edit', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/tools/123456789012345678901234/edit',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /tools/:id/links', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/tools/123456789012345678901234/links',
            })

            const { result } = renderHook(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /tools/add', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: '/tools/add',
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
