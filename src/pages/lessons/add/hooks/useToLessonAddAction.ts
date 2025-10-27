import { PlusIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import { ROUTES } from '@/shared/config/routes'
import { Role } from '@/shared/model/role'

export const useToLessonAddAction = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('navigation')
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    return {
        key: 'add',
        auth: true,
        roles: [Role.ADMIN, Role.MUA],
        icon: PlusIcon,
        label: t('actions.add'),
        onClick: () => navigate(ROUTES.backstage.lessons.add),
    }
}
