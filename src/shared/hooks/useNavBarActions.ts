import { type ComponentType, type SVGProps } from 'react'
import { useLocation } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks'
import { selectRole, selectUsername } from '@/features/auth/authSlice'
import { useMakeupBagDetailsActions } from '@/pages/makeup-bag/details/hooks/useMakeupBagDetailsActions'
import { useMakeupBagListActions } from '@/pages/makeup-bag/list/hooks/useMakeupBagListActions'
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

    const makeupBagListActions = useMakeupBagListActions()
    const makeupBagActions = useMakeupBagDetailsActions()

    const getActionsForRoute = () => {
        if (location.pathname === '/makeup-bag/list') {
            return makeupBagListActions
        }

        if (location.pathname.match(/^\/makeup-bag\/[a-f0-9]{24}$/i)) {
            return makeupBagActions
        }

        return []
    }

    const actions = getActionsForRoute()

    return actions.filter((item) => canAccess(item, username, role))
}
