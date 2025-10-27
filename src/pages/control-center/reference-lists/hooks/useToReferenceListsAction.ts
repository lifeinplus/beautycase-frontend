import { ROUTES } from '@/shared/config/routes'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const useToReferenceListsAction = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('navigation')

    return {
        key: 'back',
        auth: true,
        className: 'hidden sm:flex',
        icon: ArrowLeftIcon,
        label: t('actions.back'),
        onClick: () => navigate(ROUTES.controlCenter.referenceLists.root),
    }
}
