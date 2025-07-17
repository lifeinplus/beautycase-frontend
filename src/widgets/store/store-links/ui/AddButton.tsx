import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectRole } from '@/features/auth/authSlice'
import { setFormData } from '@/features/form/formSlice'
import type { StoreLink } from '@/features/stores/types'
import commonStyles from '@/shared/components/common/common.module.css'
import { PlusIcon } from '@heroicons/react/24/outline'
import styles from './AddButton.module.css'

export interface AddButtonProps {
    storeLinks?: StoreLink[]
}

export const AddButton = ({ storeLinks }: AddButtonProps) => {
    const navigate = useNavigate()
    const { t } = useTranslation('store')

    const dispatch = useAppDispatch()
    const role = useAppSelector(selectRole)

    const allowedRoles = ['admin', 'mua']
    const hasAccess = allowedRoles.includes(role || '')

    const handleClick = () => {
        dispatch(setFormData({ storeLinks }))
        navigate('links')
    }

    if (!hasAccess) return null

    return (
        <div>
            <button
                className={classNames(commonStyles.focusOutline, styles.button)}
                onClick={handleClick}
            >
                <span className={styles.label}>
                    {t('buttons.storeLinks.text')}
                    <PlusIcon className={styles.icon} />
                </span>
            </button>
        </div>
    )
}
