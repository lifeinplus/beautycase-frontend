import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/shared/config/routes'

export const useToMakeupBagQuestionnaireListAction = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('navigation')

    return {
        key: 'back',
        auth: true,
        className: 'hidden sm:flex',
        icon: ArrowLeftIcon,
        label: t('actions.back'),
        onClick: () => navigate(ROUTES.questionnaires.makeupBags.root),
    }
}
