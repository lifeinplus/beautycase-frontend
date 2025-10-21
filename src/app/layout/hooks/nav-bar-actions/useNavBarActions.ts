import { useLocation } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks/hooks'
import { useAddAction } from '@/app/layout/hooks/add-action/useAddAction'
import { useBackAction } from '@/app/layout/hooks/back-action/useBackAction'
import { selectRole, selectUsername } from '@/features/auth/slice/authSlice'
import { useBackToControlCenterAction } from '@/pages/control-center/gallery/hooks/useBackToControlCenterAction'
import { useBackToReferenceListsAction } from '@/pages/control-center/reference-lists/hooks/useBackToReferenceListsAction'
import { useDeleteUserAction } from '@/pages/control-center/users/details/hooks/useDeleteUserAction'
import { useBackToUsersAction } from '@/pages/control-center/users/list/hooks/useBackToUsersAction'
import { useLessonDetailsActions } from '@/pages/lessons/details/hooks/useLessonDetailsActions'
import { useMakeupBagDetailsActions } from '@/pages/makeup-bags/details/hooks/useMakeupBagDetailsActions'
import { useProductCategoryActions } from '@/pages/products/category/hooks/useProductCategoryActions'
import { useProductDetailsActions } from '@/pages/products/details/hooks/useProductDetailsActions'
import { useStageDetailsActions } from '@/pages/stages/details/hooks/useStageDetailsActions'
import { useToolDetailsActions } from '@/pages/tools/details/hooks/useToolDetailsActions'
import { canAccess } from '@/shared/lib/access/canAccess'
import type { NavBarAction } from '../types'

export const useNavBarActions = (): NavBarAction[] => {
    const location = useLocation()

    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    const addAction = useAddAction()
    const backAction = useBackAction()

    const backToControlCenterAction = useBackToControlCenterAction()
    const backToReferenceListsAction = useBackToReferenceListsAction()
    const backToUsersAction = useBackToUsersAction()
    const deleteUserAction = useDeleteUserAction()

    const lessonDetailsActions = useLessonDetailsActions()
    const makeupBagDetailsActions = useMakeupBagDetailsActions()
    const productDetailsActions = useProductDetailsActions()
    const productCategoryActions = useProductCategoryActions()
    const stageDetailsActions = useStageDetailsActions()
    const toolDetailsActions = useToolDetailsActions()

    const getActionsForRoute = (): NavBarAction[] => {
        const { pathname } = location

        const controlCenterRoutes = [
            {
                pattern: /^\/control-center\/(reference-lists|users)$/i,
                actions: [backToControlCenterAction],
            },
            {
                pattern:
                    /^\/control-center\/reference-lists\/(brands|categories|stores)$/i,
                actions: [backToReferenceListsAction],
            },
            {
                pattern: /^\/control-center\/users\/[a-f0-9]{24}$/i,
                actions: [backToUsersAction, deleteUserAction],
            },
        ]

        const lessonRoutes = [
            {
                pattern: /^\/lessons$/i,
                actions: [addAction],
            },
            {
                pattern: /^\/lessons\/[a-f0-9]{24}$/i,
                actions: lessonDetailsActions,
            },
            {
                pattern: /^\/lessons\/[a-f0-9]{24}\/(edit|products)$/i,
                actions: [backAction],
            },
            {
                pattern: /^\/lessons\/[a-f0-9]{24}\/edit\/clients$/i,
                actions: [backAction],
            },
            {
                pattern: /^\/lessons\/(add|add\/clients)$/i,
                actions: [backAction],
            },
        ]

        const makeupBagRoutes = [
            {
                pattern: /^\/makeup-bags$/i,
                actions: [addAction],
            },
            {
                pattern: /^\/makeup-bags\/[a-f0-9]{24}$/i,
                actions: makeupBagDetailsActions,
            },
            {
                pattern: /^\/makeup-bags\/[a-f0-9]{24}\/edit$/i,
                actions: [backAction],
            },
            {
                pattern: /^\/makeup-bags\/[a-f0-9]{24}\/edit\/(stages|tools)$/i,
                actions: [backAction],
            },
            {
                pattern: /^\/makeup-bags\/(add|add\/(stages|tools))$/i,
                actions: [backAction],
            },
        ]

        const productRoutes = [
            {
                pattern: /^\/products$/i,
                actions: [addAction],
            },
            {
                pattern: /^\/products\/[a-f0-9]{24}$/i,
                actions: productDetailsActions,
            },
            {
                pattern: /^\/products\/[a-f0-9]{24}\/(edit|links)$/i,
                actions: [backAction],
            },
            {
                pattern: /^\/products\/add$/i,
                actions: [backAction],
            },
            {
                pattern: /^\/products\/category\/[^/]+$/i,
                actions: productCategoryActions,
            },
        ]

        const questionnaireRoutes = [
            {
                pattern:
                    /^\/questionnaires\/(makeup-bag|makeup-bags|training|trainings)$/i,
                actions: [backAction],
            },
            {
                pattern:
                    /^\/questionnaires\/(makeup-bags|trainings)\/[a-f0-9]{24}$/i,
                actions: [backAction],
            },
        ]

        const stageRoutes = [
            {
                pattern: /^\/stages$/i,
                actions: [addAction],
            },
            {
                pattern: /^\/stages\/[a-f0-9]{24}$/i,
                actions: stageDetailsActions,
            },
            {
                pattern: /^\/stages\/[a-f0-9]{24}\/(edit|products)$/i,
                actions: [backAction],
            },
            {
                pattern: /^\/stages\/add$/i,
                actions: [backAction],
            },
        ]

        const toolRoutes = [
            {
                pattern: /^\/tools$/i,
                actions: [addAction],
            },
            {
                pattern: /^\/tools\/[a-f0-9]{24}$/i,
                actions: toolDetailsActions,
            },
            {
                pattern: /^\/tools\/[a-f0-9]{24}\/edit$/i,
                actions: [backAction],
            },
            {
                pattern: /^\/tools\/[a-f0-9]{24}\/links$/i,
                actions: [backAction],
            },
            {
                pattern: /^\/tools\/add$/i,
                actions: [backAction],
            },
        ]

        const match = [
            ...controlCenterRoutes,
            ...lessonRoutes,
            ...makeupBagRoutes,
            ...productRoutes,
            ...questionnaireRoutes,
            ...stageRoutes,
            ...toolRoutes,
        ].find((route) => route.pattern.test(pathname))

        return (match?.actions || []).filter(Boolean) as NavBarAction[]
    }

    const actions = getActionsForRoute()

    return actions.filter((item) => canAccess(item, username, role))
}
