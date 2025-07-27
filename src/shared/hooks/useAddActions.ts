import { PlusIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { clearFormData } from '@/features/form/formSlice'

export const useAddActions = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('navigation')
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    return [
        {
            key: 'add',
            auth: true,
            roles: ['admin', 'mua'],
            icon: PlusIcon,
            label: t('actions.add'),
            onClick: () => navigate('add'),
        },
    ]
}
