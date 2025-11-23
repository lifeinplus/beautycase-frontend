import { PlusIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/shared/config/routes'
import { Role } from '@/shared/model/role'

export const useToStageAddAction = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('navigation')

    return {
        key: 'add',
        auth: true,
        roles: [Role.ADMIN, Role.MUA],
        icon: PlusIcon,
        label: t('actions.add'),
        onClick: () => navigate(ROUTES.backstage.stages.add),
    }
}
