import { type ComponentType, type SVGProps } from 'react'
import { useLocation } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks'
import { selectRole, selectUsername } from '@/features/auth/authSlice'
import { useLessonDetailsActions } from '@/pages/lessons/details/hooks/useLessonDetailsActions'
import { useMakeupBagDetailsActions } from '@/pages/makeup-bags/details/hooks/useMakeupBagDetailsActions'
import { useProductDetailsActions } from '@/pages/product/details/hooks/useProductDetailsActions'
import { useAddActions } from '@/shared/hooks/useAddActions'
import { useBackActions } from '@/shared/hooks/useBackActions'
import { canAccess } from '@/shared/utils/menu'

export interface NavBarAction {
    key: string
    className?: string
    icon: ComponentType<SVGProps<SVGSVGElement>>
    label: string
    onClick: () => void
    auth?: boolean
    roles?: string[]
    modalProps?: {
        isOpen: boolean
        title: string
        description: string
        onConfirm: () => Promise<void>
        onCancel: () => void
    }
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
                pattern: /^\/lessons\/[a-f0-9]{24}\/products$/i,
                actions: backActions,
            },
            {
                pattern: /^\/lessons\/(add|add\/clients)$/i,
                actions: backActions,
            },
            {
                pattern:
                    /^\/lessons\/(edit\/[a-f0-9]{24}|edit\/[a-f0-9]{24}\/clients)$/i,
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
                pattern: /^\/makeup-bags\/(add|add\/(stages|tools))$/i,
                actions: backActions,
            },
            {
                pattern:
                    /^\/makeup-bags\/(edit\/[a-f0-9]{24}|edit\/[a-f0-9]{24}\/(stages|tools))$/i,
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
                pattern: /^\/products\/[a-f0-9]{24}\/links$/i,
                actions: backActions,
            },
            {
                pattern: /^\/products\/add$/i,
                actions: backActions,
            },
            {
                pattern: /^\/products\/edit\/[a-f0-9]{24}$/i,
                actions: backActions,
            },
        ]

        const referenceListRoutes = [
            {
                pattern: /^\/reference-lists\/brands$/i,
                actions: backActions,
            },
        ]

        const match = [
            ...lessonRoutes,
            ...makeupBagRoutes,
            ...productRoutes,
            ...referenceListRoutes,
        ].find((route) => route.pattern.test(pathname))

        return match?.actions || []
    }

    const actions = getActionsForRoute()

    return actions.filter((item) => canAccess(item, username, role))
}
