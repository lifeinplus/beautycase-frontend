import { Role } from '@/shared/model/role'
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const useProductCategoryActions = () => {
    const navigate = useNavigate()
    const { t } = useTranslation(['navigation', 'modal'])

    return [
        {
            key: 'back',
            auth: true,
            className: 'hidden sm:flex',
            icon: ArrowLeftIcon,
            label: t('actions.back'),
            onClick: () => navigate('/products'),
        },
        {
            key: 'add',
            auth: true,
            roles: [Role.ADMIN, Role.MUA],
            icon: PlusIcon,
            label: t('actions.add'),
            onClick: () => navigate('add'),
        },
    ]
}
