import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { ROUTES } from '@/shared/config/routes'
import { Role } from '@/shared/model/role'

export const useToLessonEditAction = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation('navigation')

    return {
        key: 'edit',
        auth: true,
        roles: [Role.ADMIN, Role.MUA],
        icon: PencilSquareIcon,
        label: t('actions.edit'),
        onClick: () => navigate(ROUTES.backstage.lessons.edit(id!)),
    }
}
