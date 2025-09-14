import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import navButtonStyles from '@/shared/components/navigation/nav-button/NavButton.module.css'

export const useBackActions = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('navigation')
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    return [
        {
            key: 'back',
            auth: true,
            className: navButtonStyles.navBtnBack,
            icon: ArrowLeftIcon,
            label: t('actions.back'),
            onClick: () => navigate(-1),
        },
    ]
}
