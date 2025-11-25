import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { ROUTES } from '@/shared/config/routes'
import { Role } from '@/shared/model/role'

export const useToMakeupBagEditAction = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation('actions')

    return {
        key: 'edit',
        auth: true,
        roles: [Role.ADMIN, Role.MUA],
        icon: PencilSquareIcon,
        label: t('edit'),
        onClick: () => navigate(ROUTES.backstage.makeupBags.edit(id!)),
    }
}
