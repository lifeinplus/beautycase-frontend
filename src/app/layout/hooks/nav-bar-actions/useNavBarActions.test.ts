import { useLocation } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { ROUTES } from '@/shared/config/routes'
import { mockLocation } from '@/tests/mocks/router'
import { renderHookWithProvider } from '@/tests/mocks/wrappers'
import { useNavBarActions } from './useNavBarActions'

vi.mock('@/app/hooks/hooks')
vi.mock('@/shared/lib/access/canAccess')

describe('useNavBarActions', () => {
    describe('lessonRoutes', () => {
        it('returns actions on /lessons', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.lessons.root,
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
            expect(result.current[1].key).toEqual('add')
        })

        it('returns actions on /lessons/:id', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.lessons.details(
                    '123456789012345678901234'
                ),
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
            expect(result.current[1].key).toEqual('edit')
            expect(result.current[2].key).toEqual('delete')
        })

        it('returns actions on /lessons/:id/edit', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.lessons.edit(
                    '123456789012345678901234'
                ),
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /lessons/:id/edit/clients', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: `${ROUTES.backstage.lessons.edit('123456789012345678901234')}/clients`,
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /lessons/:id/products', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.lessons.products(
                    '123456789012345678901234'
                ),
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /lessons/add', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.lessons.add,
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /lessons/add/clients', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: `${ROUTES.backstage.lessons.add}/clients`,
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })
    })

    describe('makeupBagRoutes', () => {
        it('returns actions on /makeup-bags', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.makeupBags.root,
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
            expect(result.current[1].key).toEqual('add')
        })

        it('returns actions on /makeup-bags/:id', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.makeupBags.details(
                    '123456789012345678901234'
                ),
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
            expect(result.current[1].key).toEqual('export')
            expect(result.current[2].key).toEqual('edit')
        })

        it('returns actions on /makeup-bags/:id/edit', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.makeupBags.edit(
                    '123456789012345678901234'
                ),
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /makeup-bags/:id/edit/stages', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: `${ROUTES.backstage.makeupBags.edit(
                    '123456789012345678901234'
                )}/stages`,
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /makeup-bags/:id/edit/tools', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: `${ROUTES.backstage.makeupBags.edit(
                    '123456789012345678901234'
                )}/tools`,
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /makeup-bags/add', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.makeupBags.add,
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /makeup-bags/add/stages', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: `${ROUTES.backstage.makeupBags.add}/stages`,
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /makeup-bags/add/tools', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: `${ROUTES.backstage.makeupBags.add}/tools`,
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })
    })

    describe('productRoutes', () => {
        it('returns actions on /products', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.products.root,
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
            expect(result.current[1].key).toEqual('add')
        })

        it('returns actions on /products/:id', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.products.details(
                    '123456789012345678901234'
                ),
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
            expect(result.current[1].key).toEqual('edit')
        })

        it('returns actions on /products/:id/edit', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.products.edit(
                    '123456789012345678901234'
                ),
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /products/:id/links', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.products.links(
                    '123456789012345678901234'
                ),
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /products/add', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.products.add,
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })
    })

    describe('questionnaireRoutes', () => {
        it('returns actions on /questionnaires/makeup-bags/:id', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.questionnaires.makeupBags.result(
                    '123456789012345678901234'
                ),
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /questionnaires/trainings/:id', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.questionnaires.trainings.result(
                    '123456789012345678901234'
                ),
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })
    })

    describe('referenceListRoutes', () => {
        it('returns actions on /reference-lists/brands', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.controlCenter.referenceLists.brands,
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /reference-lists/stores', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.controlCenter.referenceLists.stores,
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })
    })

    describe('stageRoutes', () => {
        it('returns actions on /stages', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.stages.root,
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
            expect(result.current[1].key).toEqual('add')
        })

        it('returns actions on /stages/:id', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.stages.details(
                    '123456789012345678901234'
                ),
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
            expect(result.current[1].key).toEqual('edit')
        })

        it('returns actions on /stages/:id/edit', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.stages.edit(
                    '123456789012345678901234'
                ),
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /stages/:id/products', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.stages.products(
                    '123456789012345678901234'
                ),
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /stages/add', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.stages.add,
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })
    })

    describe('toolRoutes', () => {
        it('returns actions on /tools', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.tools.root,
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
            expect(result.current[1].key).toEqual('add')
        })

        it('returns actions on /tools/:id', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.tools.details(
                    '123456789012345678901234'
                ),
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
            expect(result.current[1].key).toEqual('edit')
        })

        it('returns actions on /tools/:id/edit', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.tools.edit(
                    '123456789012345678901234'
                ),
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /tools/:id/links', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.tools.links(
                    '123456789012345678901234'
                ),
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })

        it('returns actions on /tools/add', () => {
            vi.mocked(useLocation).mockReturnValue({
                ...mockLocation,
                pathname: ROUTES.backstage.tools.add,
            })

            const { result } = renderHookWithProvider(() => useNavBarActions())

            expect(result.current[0].key).toEqual('back')
        })
    })

    it('returns empty array for unrelated route', () => {
        vi.mocked(useLocation).mockReturnValue(mockLocation)
        const { result } = renderHookWithProvider(() => useNavBarActions())
        expect(result.current).toEqual([])
    })
})
