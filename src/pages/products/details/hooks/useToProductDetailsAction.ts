import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { ROUTES } from '@/shared/config/routes'

export const useToProductDetailsAction = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation('actions')

    return {
        key: 'back',
        auth: true,
        className: 'hidden md:flex',
        icon: ArrowLeftIcon,
        label: t('back'),
        onClick: () =>
            navigate(ROUTES.backstage.products.details(id!), {
                replace: true,
            }),
    }
}
