import { useLocation } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks/hooks'
import { useAddAction } from '@/app/layout/hooks/add-action/useAddAction'
import { useBackAction } from '@/app/layout/hooks/back-action/useBackAction'
import { selectRole, selectUsername } from '@/features/auth/slice/authSlice'
import { useToAccountAction } from '@/pages/account/hooks/useToAccountAction'
import { useToBackstageGalleryAction } from '@/pages/backstage/gallery/hooks/useToBackstageGalleryAction'
import { useToControlCenterGalleryAction } from '@/pages/control-center/gallery/hooks/useToControlCenterGalleryAction'
import { useToReferenceListsAction } from '@/pages/control-center/reference-lists/hooks/useToReferenceListsAction'
import { useDeleteUserAction } from '@/pages/control-center/users/details/hooks/useDeleteUserAction'
import { useToUsersListAction } from '@/pages/control-center/users/list/hooks/useToUsersListAction'
import { useLessonDetailsActions } from '@/pages/lessons/details/hooks/useLessonDetailsActions'
import { useToMakeupBagAddAction } from '@/pages/makeup-bags/add/hooks/useToMakeupBagAddAction'
import { useToMakeupBagEditAction } from '@/pages/makeup-bags/edit/hooks/useToMakeupBagEditAction'
import { useToMakeupBagListAction } from '@/pages/makeup-bags/list/hooks/useToMakeupBagListAction'
import { useToProductAddAction } from '@/pages/products/add/hooks/useToProductAddAction'
import { useToCategoryProductsAction } from '@/pages/products/category/hooks/toCategoryProductsAction'
import { useToProductEditAction } from '@/pages/products/edit/hooks/useToProductEditAction'
import { useToProductGalleryAction } from '@/pages/products/gallery/hooks/useToProductGalleryAction'
import { useToStageAddAction } from '@/pages/stages/add/hooks/useToStageAddAction'
import { useDeleteStageAction } from '@/pages/stages/details/hooks/useDeleteStageAction'
import { useDuplicateStageAction } from '@/pages/stages/details/hooks/useDuplicateStageAction'
import { useToStageDetailsAction } from '@/pages/stages/details/hooks/useToStageDetailsAction'
import { useToStageEditAction } from '@/pages/stages/edit/hooks/useToStageEditAction'
import { useToStageListAction } from '@/pages/stages/list/hooks/useToStageListAction'
import { useToolDetailsActions } from '@/pages/tools/details/hooks/useToolDetailsActions'
import { ROUTES } from '@/shared/config/routes'
import { canAccess } from '@/shared/lib/access/canAccess'
import { useDeleteMakeupBagAction } from '@/widgets/makeup-bag/details/hooks/useDeleteMakeupBagAction'
import { useExportMakeupBagAction } from '@/widgets/makeup-bag/details/hooks/useExportMakeupBagAction'
import { useToMakeupBagDetailsAction } from '@/widgets/makeup-bag/details/hooks/useToMakeupBagDetailsAction'
import { useDeleteProductAction } from '@/widgets/product/details/hooks/useDeleteProductAction'
import { useDuplicateProductAction } from '@/widgets/product/details/hooks/useDuplicateProductAction'
import { useToProductDetailsAction } from '@/widgets/product/details/hooks/useToProductDetailsAction'
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

    const toBackstageGalleryAction = useToBackstageGalleryAction()

    const lessonDetailsActions = useLessonDetailsActions()

    const toMakeupBagAddAction = useToMakeupBagAddAction()
    const toMakeupBagDetailsAction = useToMakeupBagDetailsAction()
    const toMakeupBagEditAction = useToMakeupBagEditAction()
    const toMakeupBagListAction = useToMakeupBagListAction()
    const exportMakeupBagAction = useExportMakeupBagAction()
    const deleteMakeupBagAction = useDeleteMakeupBagAction()

    const toProductAddAction = useToProductAddAction()
    const toProductDetailsAction = useToProductDetailsAction()
    const toProductEditAction = useToProductEditAction()
    const toCategoryProductsAction = useToCategoryProductsAction()
    const deleteProductAction = useDeleteProductAction()
    const duplicateProductAction = useDuplicateProductAction()
    const toProductGalleryAction = useToProductGalleryAction()

    const toStageAddAction = useToStageAddAction()
    const toStageDetailsAction = useToStageDetailsAction()
    const toStageEditAction = useToStageEditAction()
    const toStageListAction = useToStageListAction()
    const deleteStageAction = useDeleteStageAction()
    const duplicateStageAction = useDuplicateStageAction()

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

        const makeupBagsRoot = ROUTES.backstage.makeupBags.root
        const makeupBagRoutes = [
            {
                pattern: new RegExp(`^${makeupBagsRoot}$`),
                actions: [toBackstageGalleryAction, toMakeupBagAddAction],
            },
            {
                pattern: new RegExp(`^${makeupBagsRoot}/[a-f0-9]{24}$`),
                actions: [
                    toMakeupBagListAction,
                    exportMakeupBagAction,
                    toMakeupBagEditAction,
                    deleteMakeupBagAction,
                ],
            },
            {
                pattern: new RegExp(`^${makeupBagsRoot}/[a-f0-9]{24}/edit$`),
                actions: [toMakeupBagDetailsAction],
            },
            {
                pattern: new RegExp(
                    `^${makeupBagsRoot}/[a-f0-9]{24}/edit/(stages|tools)$`
                ),
                actions: [backAction],
            },
            {
                pattern: new RegExp(
                    `^${makeupBagsRoot}/(add|add/(stages|tools))$`
                ),
                actions: [backAction],
            },
        ]

        const productsRoot = ROUTES.backstage.products.root
        const productRoutes = [
            {
                pattern: new RegExp(`^${productsRoot}$`),
                actions: [toBackstageGalleryAction, toProductAddAction],
            },
            {
                pattern: new RegExp(`^${productsRoot}/[a-f0-9]{24}$`),
                actions: [
                    toCategoryProductsAction,
                    toProductEditAction,
                    duplicateProductAction,
                    deleteProductAction,
                ],
            },
            {
                pattern: new RegExp(
                    `^${productsRoot}/[a-f0-9]{24}/(edit|links)$`
                ),
                actions: [toProductDetailsAction],
            },
            {
                pattern: new RegExp(`^${productsRoot}/add$`),
                actions: [toProductGalleryAction],
            },
            {
                pattern: new RegExp(`^${productsRoot}/category/[^/]+$`),
                actions: [toProductGalleryAction, toProductAddAction],
            },
        ]

        const publicRoutes = [
            {
                pattern: new RegExp(
                    `^${ROUTES.public.makeupBags.root}/[a-f0-9]{24}$`
                ),
                actions: [toAccountAction],
            },
            {
                pattern: new RegExp(
                    `^${ROUTES.public.products.root}/[a-f0-9]{24}$`
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

        const stagesRoot = ROUTES.backstage.stages.root
        const stageRoutes = [
            {
                pattern: new RegExp(`^${stagesRoot}$`),
                actions: [toBackstageGalleryAction, toStageAddAction],
            },
            {
                pattern: new RegExp(`^${stagesRoot}/[a-f0-9]{24}$`),
                actions: [
                    toStageListAction,
                    toStageEditAction,
                    duplicateStageAction,
                    deleteStageAction,
                ],
            },
            {
                pattern: new RegExp(
                    `^${stagesRoot}/[a-f0-9]{24}/(edit|products)$`
                ),
                actions: [toStageDetailsAction],
            },
            {
                pattern: new RegExp(`^${stagesRoot}/add$`),
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
