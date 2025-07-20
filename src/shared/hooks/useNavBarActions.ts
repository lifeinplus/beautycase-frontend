import { type ComponentType, type SVGProps } from 'react'
import { useLocation } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks'
import { selectRole, selectUsername } from '@/features/auth/authSlice'
import { useMakeupBagAddActions } from '@/pages/makeup-bags/add/hooks/useMakeupBagAddActions'
import { useMakeupBagDetailsActions } from '@/pages/makeup-bags/details/hooks/useMakeupBagDetailsActions'
import { useMakeupBagListActions } from '@/pages/makeup-bags/list/hooks/useMakeupBagListActions'
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

    const makeupBagAddActions = useMakeupBagAddActions()
    const makeupBagDetailsActions = useMakeupBagDetailsActions()
    const makeupBagListActions = useMakeupBagListActions()

    const getActionsForRoute = () => {
        if (location.pathname === '/makeup-bags') {
            return makeupBagListActions
        }

        if (location.pathname === '/makeup-bags/add') {
            return makeupBagAddActions
        }

        if (location.pathname.match(/^\/makeup-bags\/[a-f0-9]{24}$/i)) {
            return makeupBagDetailsActions
        }

        return []
    }

    const actions = getActionsForRoute()

    return actions.filter((item) => canAccess(item, username, role))
}
