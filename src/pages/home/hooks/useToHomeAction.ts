import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { ROUTES } from '@/shared/config/routes'

export const useToHomeAction = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation('actions')

    return {
        key: 'back',
        auth: true,
        className: 'hidden md:flex',
        icon: ArrowLeftIcon,
        label: t('back'),
        onClick: () => {
            if (state?.prev) {
                navigate(state?.prev, {
                    replace: true,
                    state: { origin: state.origin, scrollId: id },
                })
            } else {
                navigate(state?.origin || ROUTES.home, {
                    replace: true,
                    state: { scrollId: id },
                })
            }
        },
    }
}
