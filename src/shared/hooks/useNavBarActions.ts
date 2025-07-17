import { useLocation } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks'
import { selectRole, selectUsername } from '@/features/auth/authSlice'
import { useMakeupBagActions } from '@/pages/makeup-bag/hooks/useMakeupBagActions'
import { useMakeupBagListActions } from '@/pages/makeup-bag/hooks/useMakeupBagListActions'
import { canAccess } from '@/shared/utils/menu'

export const useNavBarActions = () => {
    const location = useLocation()
    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    const makeupBagListActions = useMakeupBagListActions()
    const makeupBagActions = useMakeupBagActions()

    const getActionsForRoute = () => {
        if (location.pathname === '/makeup_bags') {
            return makeupBagListActions
        }

        if (location.pathname.match(/^\/makeup_bags\/[a-f0-9]{24}$/i)) {
            return makeupBagActions
        }

        return []
    }

    const actions = getActionsForRoute()

    return actions.filter((item) => canAccess(item, username, role))
}
