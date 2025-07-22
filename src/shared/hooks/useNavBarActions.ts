import { type ComponentType, type SVGProps } from 'react'
import { useLocation } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks'
import { selectRole, selectUsername } from '@/features/auth/authSlice'
import { useMakeupBagDetailsActions } from '@/pages/makeup-bags/details/hooks/useMakeupBagDetailsActions'
import { useMakeupBagListActions } from '@/pages/makeup-bags/list/hooks/useMakeupBagListActions'
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

    const backActions = useBackActions()
    const makeupBagDetailsActions = useMakeupBagDetailsActions()
    const makeupBagListActions = useMakeupBagListActions()

    const getActionsForRoute = () => {
        const { pathname } = location

        const routeMap = [
            {
                pattern: /^\/makeup-bags$/i,
                actions: makeupBagListActions,
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

        const match = routeMap.find((route) => route.pattern.test(pathname))
        return match?.actions || []
    }

    const actions = getActionsForRoute()

    return actions.filter((item) => canAccess(item, username, role))
}
