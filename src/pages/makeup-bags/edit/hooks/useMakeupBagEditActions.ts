import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { clearFormData } from '@/features/form/formSlice'
import navStyles from '@/shared/components/navigation/navigation.module.css'

const ACTIONS = {
    back: { icon: ArrowLeftIcon, label: 'actions.back' },
} as const

type ActionId = keyof typeof ACTIONS

interface ActionItem {
    id: ActionId
    auth?: boolean
    className?: string
    roles?: string[]
}

const ACTION_ITEMS: ActionItem[] = [
    { id: 'back', auth: true, className: navStyles.navBtnBack },
]

export const useMakeupBagEditActions = () => {
    const navigate = useNavigate()
    const { t } = useTranslation(['makeupBag'])
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    const actionHandlers = {
        back: () => navigate(-1),
    }

    return ACTION_ITEMS.map(({ id, ...rest }) => ({
        key: id,
        ...rest,
        icon: ACTIONS[id].icon,
        label: t(`navigation:${ACTIONS[id].label}`),
        onClick: actionHandlers[id],
    }))
}
