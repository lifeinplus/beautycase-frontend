import { PlusIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { clearFormData } from '@/features/form/formSlice'

const ACTIONS = {
    add: {
        icon: PlusIcon,
        label: 'actions.add',
    },
} as const

type ActionId = keyof typeof ACTIONS

interface ActionItem {
    id: ActionId
    auth?: boolean
    className?: string
    roles?: string[]
}

const ACTION_ITEMS: ActionItem[] = [
    { id: 'add', auth: true, roles: ['admin', 'mua'] },
]

export const useMakeupBagListActions = () => {
    const navigate = useNavigate()
    const { t } = useTranslation(['makeupBag'])
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    const actionHandlers = {
        add: () => navigate('add'),
    }

    return ACTION_ITEMS.map(({ id, ...rest }) => ({
        key: id,
        ...rest,
        icon: ACTIONS[id].icon,
        label: t(`navigation:${ACTIONS[id].label}`),
        onClick: actionHandlers[id],
    }))
}
