import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/shared/config/routes'

export const useToStageListAction = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()

    return {
        key: 'back',
        auth: true,
        className: 'hidden md:flex',
        icon: ArrowLeftIcon,
        label: t('back'),
        onClick: () => navigate(ROUTES.backstage.stages.root),
    }
}
