import { type ComponentType, type SVGProps } from 'react'
import { useLocation } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks/hooks'
import { useAddActions } from '@/app/layout/hooks/add-actions/useAddActions'
import { useBackActions } from '@/app/layout/hooks/back-actions/useBackActions'
import { selectRole, selectUsername } from '@/features/auth/slice/authSlice'
import { useLessonDetailsActions } from '@/pages/lessons/details/hooks/useLessonDetailsActions'
import { useMakeupBagDetailsActions } from '@/pages/makeup-bags/details/hooks/useMakeupBagDetailsActions'
import { useProductDetailsActions } from '@/pages/products/details/hooks/useProductDetailsActions'
import { useStageDetailsActions } from '@/pages/stages/details/hooks/useStageDetailsActions'
import { useToolDetailsActions } from '@/pages/tools/details/hooks/useToolDetailsActions'
import { ModalDeleteProps } from '@/shared/components/modals/delete/ModalDelete'
import { canAccess } from '@/shared/lib/access/canAccess'

export interface NavBarAction {
    key: string
    className?: string
    icon: ComponentType<SVGProps<SVGSVGElement>>
    label: string
    onClick: () => void
    auth?: boolean
    roles?: string[]
    modalProps?: ModalDeleteProps
}

export const useNavBarActions = (): NavBarAction[] => {
    const location = useLocation()

    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    const addActions = useAddActions()
    const backActions = useBackActions()

    const lessonDetailsActions = useLessonDetailsActions()
    const makeupBagDetailsActions = useMakeupBagDetailsActions()
    const productDetailsActions = useProductDetailsActions()
    const stageDetailsActions = useStageDetailsActions()
    const toolDetailsActions = useToolDetailsActions()

    const getActionsForRoute = () => {
        const { pathname } = location

        const lessonRoutes = [
            {
                pattern: /^\/lessons$/i,
                actions: addActions,
            },
            {
                pattern: /^\/lessons\/[a-f0-9]{24}$/i,
                actions: lessonDetailsActions,
            },
            {
                pattern: /^\/lessons\/[a-f0-9]{24}\/(edit|products)$/i,
                actions: backActions,
            },
            {
                pattern: /^\/lessons\/[a-f0-9]{24}\/edit\/clients$/i,
                actions: backActions,
            },
            {
                pattern: /^\/lessons\/(add|add\/clients)$/i,
                actions: backActions,
            },
        ]

        const makeupBagRoutes = [
            {
                pattern: /^\/makeup-bags$/i,
                actions: addActions,
            },
            {
                pattern: /^\/makeup-bags\/[a-f0-9]{24}$/i,
                actions: makeupBagDetailsActions,
            },
            {
                pattern: /^\/makeup-bags\/[a-f0-9]{24}\/edit$/i,
                actions: backActions,
            },
            {
                pattern: /^\/makeup-bags\/[a-f0-9]{24}\/edit\/(stages|tools)$/i,
                actions: backActions,
            },
            {
                pattern: /^\/makeup-bags\/(add|add\/(stages|tools))$/i,
                actions: backActions,
            },
        ]

        const productRoutes = [
            {
                pattern: /^\/products$/i,
                actions: addActions,
            },
            {
                pattern: /^\/products\/[a-f0-9]{24}$/i,
                actions: productDetailsActions,
            },
            {
                pattern: /^\/products\/[a-f0-9]{24}\/(edit|links)$/i,
                actions: backActions,
            },
            {
                pattern: /^\/products\/add$/i,
                actions: backActions,
            },
            {
                pattern: /^\/products\/category\/[^/]+$/i,
                actions: [...backActions, ...addActions],
            },
        ]

        const questionnaireRoutes = [
            {
                pattern: /^\/questionnaires\/[a-f0-9]{24}$/i,
                actions: backActions,
            },
        ]

        const referenceListRoutes = [
            {
                pattern: /^\/reference-lists\/(brands|categories|stores)$/i,
                actions: backActions,
            },
        ]

        const stageRoutes = [
            {
                pattern: /^\/stages$/i,
                actions: addActions,
            },
            {
                pattern: /^\/stages\/[a-f0-9]{24}$/i,
                actions: stageDetailsActions,
            },
            {
                pattern: /^\/stages\/[a-f0-9]{24}\/(edit|products)$/i,
                actions: backActions,
            },
            {
                pattern: /^\/stages\/add$/i,
                actions: backActions,
            },
        ]

        const toolRoutes = [
            {
                pattern: /^\/tools$/i,
                actions: addActions,
            },
            {
                pattern: /^\/tools\/[a-f0-9]{24}$/i,
                actions: toolDetailsActions,
            },
            {
                pattern: /^\/tools\/[a-f0-9]{24}\/edit$/i,
                actions: backActions,
            },
            {
                pattern: /^\/tools\/[a-f0-9]{24}\/links$/i,
                actions: backActions,
            },
            {
                pattern: /^\/tools\/add$/i,
                actions: backActions,
            },
        ]

        const match = [
            ...lessonRoutes,
            ...makeupBagRoutes,
            ...productRoutes,
            ...questionnaireRoutes,
            ...referenceListRoutes,
            ...stageRoutes,
            ...toolRoutes,
        ].find((route) => route.pattern.test(pathname))

        return match?.actions || []
    }

    const actions = getActionsForRoute()

    return actions.filter((item) => canAccess(item, username, role))
}
