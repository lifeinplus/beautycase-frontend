import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import { selectRole } from '@/features/auth/slice/authSlice'
import { setFormData } from '@/features/form/slice/formSlice'
import type { StoreLink } from '@/features/stores/types'
import { Role } from '@/shared/model/role'
import { PlusIcon } from '@heroicons/react/24/outline'

export interface AddButtonProps {
    storeLinks?: StoreLink[]
}

export const AddButton = ({ storeLinks }: AddButtonProps) => {
    const navigate = useNavigate()
    const { t } = useTranslation('store')

    const dispatch = useAppDispatch()
    const role = useAppSelector(selectRole)

    const allowedRoles = [Role.ADMIN, Role.MUA]
    const hasAccess = !!role && allowedRoles.includes(role)

    const handleClick = () => {
        dispatch(setFormData({ storeLinks }))
        navigate('links')
    }

    if (!hasAccess) return null

    return (
        <div>
            <button
                className={classNames(
                    'group focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed',
                    'dark:focus-visible:outline-rose-700',
                    'hover:rounded-full focus-visible:rounded-full'
                )}
                onClick={handleClick}
            >
                <span
                    className={classNames(
                        'inline-flex items-center gap-2 bg-white py-2 ps-4 pe-3 text-sm font-medium text-neutral-600 hover:bg-rose-500 hover:text-white',
                        'rounded-full ring-1 ring-neutral-200 ring-inset hover:ring-white',
                        'text-neutral-700 group-hover:text-white dark:bg-black dark:text-neutral-300 dark:ring-neutral-700 dark:hover:bg-rose-600 dark:hover:ring-white'
                    )}
                >
                    {t('buttons.storeLinks.text')}
                    <PlusIcon className="h-4 w-4 stroke-2" />
                </span>
            </button>
        </div>
    )
}
