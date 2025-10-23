import { useLocation } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks/hooks'
import { useAddAction } from '@/app/layout/hooks/add-action/useAddAction'
import { useBackAction } from '@/app/layout/hooks/back-action/useBackAction'
import { selectRole, selectUsername } from '@/features/auth/slice/authSlice'
import { useToAccountAction } from '@/pages/account/hooks/useToAccountAction'
import { useToControlCenterGalleryAction } from '@/pages/control-center/gallery/hooks/useToControlCenterGalleryAction'
import { useToReferenceListsAction } from '@/pages/control-center/reference-lists/hooks/useToReferenceListsAction'
import { useDeleteUserAction } from '@/pages/control-center/users/details/hooks/useDeleteUserAction'
import { useToUsersListAction } from '@/pages/control-center/users/list/hooks/useToUsersListAction'
import { useLessonDetailsActions } from '@/pages/lessons/details/hooks/useLessonDetailsActions'
import { useToMakeupBagAddAction } from '@/pages/makeup-bags/add/hooks/useToMakeupBagAddAction'
import { useToMakeupBagEditAction } from '@/pages/makeup-bags/edit/hooks/useToMakeupBagEditAction'
import { useToMakeupBagListAction } from '@/pages/makeup-bags/list/hooks/useToMakeupBagListAction'
import { useProductCategoryActions } from '@/pages/products/category/hooks/useProductCategoryActions'
import { useProductDetailsActions } from '@/pages/products/details/hooks/useProductDetailsActions'
import { useStageDetailsActions } from '@/pages/stages/details/hooks/useStageDetailsActions'
import { useToolDetailsActions } from '@/pages/tools/details/hooks/useToolDetailsActions'
import { ROUTES } from '@/shared/config/routes'
import { canAccess } from '@/shared/lib/access/canAccess'
import { useDeleteMakeupBagAction } from '@/widgets/makeup-bag/details/hooks/useDeleteMakeupBagAction'
import { useExportMakeupBagAction } from '@/widgets/makeup-bag/details/hooks/useExportMakeupBagAction'
import { useToMakeupBagDetailsAction } from '@/widgets/makeup-bag/details/hooks/useToMakeupBagDetailsAction'
import type { NavBarAction } from '../types'

export const useNavBarActions = (): NavBarAction[] => {
    const location = useLocation()

    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    const addAction = useAddAction()
    const backAction = useBackAction()

    const toControlCenterGalleryAction = useToControlCenterGalleryAction()
    const toReferenceListsAction = useToReferenceListsAction()
    const toUsersListAction = useToUsersListAction()
    const deleteUserAction = useDeleteUserAction()

    const lessonDetailsActions = useLessonDetailsActions()

    const toMakeupBagAddAction = useToMakeupBagAddAction()
    const toMakeupBagDetailsAction = useToMakeupBagDetailsAction()
    const toMakeupBagEditAction = useToMakeupBagEditAction()
    const toMakeupBagListAction = useToMakeupBagListAction()
    const exportMakeupBagAction = useExportMakeupBagAction()
    const deleteMakeupBagAction = useDeleteMakeupBagAction()

    const productDetailsActions = useProductDetailsActions()
    const productCategoryActions = useProductCategoryActions()
    const stageDetailsActions = useStageDetailsActions()
    const toolDetailsActions = useToolDetailsActions()

    const toAccountAction = useToAccountAction()

    const getActionsForRoute = (): NavBarAction[] => {
        const { pathname } = location

        const controlCenterRoutes = [
            {
                pattern: /^\/control-center\/(reference-lists|users)$/i,
                actions: [toControlCenterGalleryAction],
            },
            {
                pattern:
                    /^\/control-center\/reference-lists\/(brands|categories|stores)$/i,
                actions: [toReferenceListsAction],
            },
            {
                pattern: /^\/control-center\/users\/[a-f0-9]{24}$/i,
                actions: [toUsersListAction, deleteUserAction],
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

        const makeupBagBase = ROUTES.backstage.makeupBags()

        const makeupBagRoutes = [
            {
                pattern: new RegExp(`^${makeupBagBase}$`),
                actions: [toMakeupBagAddAction],
            },
            {
                pattern: new RegExp(`^${makeupBagBase}/[a-f0-9]{24}$`),
                actions: [
                    toMakeupBagListAction,
                    exportMakeupBagAction,
                    toMakeupBagEditAction,
                    deleteMakeupBagAction,
                ],
            },
            {
                pattern: new RegExp(`^${makeupBagBase}/[a-f0-9]{24}/edit$`),
                actions: [toMakeupBagDetailsAction],
            },
            {
                pattern: new RegExp(
                    `^${makeupBagBase}/[a-f0-9]{24}/edit/(stages|tools)$`
                ),
                actions: [backAction],
            },
            {
                pattern: new RegExp(
                    `^${makeupBagBase}/(add|add/(stages|tools))$`
                ),
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

        const publicRoutes = [
            {
                pattern: new RegExp(
                    `^${ROUTES.public.makeupBags.root}/[a-f0-9]{24}$`
                ),
                actions: [toAccountAction],
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
            ...publicRoutes,
            ...questionnaireRoutes,
            ...stageRoutes,
            ...toolRoutes,
        ].find((route) => route.pattern.test(pathname))

        return (match?.actions || []).filter(Boolean) as NavBarAction[]
    }

    const actions = getActionsForRoute()

    return actions.filter((item) => canAccess(item, username, role))
}
