import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import { ROUTES } from '@/shared/config/routes'
import { Role } from '@/shared/model/role'

export const useToProductEditAction = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation('navigation')
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    return {
        key: 'edit',
        auth: true,
        roles: [Role.ADMIN, Role.MUA],
        icon: PencilSquareIcon,
        label: t('actions.edit'),
        onClick: () => navigate(ROUTES.backstage.products.edit(id!)),
    }
}
