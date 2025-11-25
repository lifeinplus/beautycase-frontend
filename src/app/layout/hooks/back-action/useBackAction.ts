import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import type { NavBarAction } from '../types'

export const useBackAction = (): NavBarAction => {
    const navigate = useNavigate()
    const { t } = useTranslation('actions')

    return {
        key: 'back',
        auth: true,
        className: 'hidden md:flex',
        icon: ArrowLeftIcon,
        label: t('back'),
        onClick: () => navigate(-1),
    }
}
