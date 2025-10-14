import { SquaresPlusIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import { selectRole } from '@/features/auth/slice/authSlice'
import { setFormData } from '@/features/form/slice/formSlice'
import type { Product } from '@/features/products/types'

export interface SelectTileProps {
    products?: Product[]
}

export const SelectTile = ({ products }: SelectTileProps) => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const role = useAppSelector(selectRole)

    const allowedRoles = ['admin', 'mua']
    const hasAccess = allowedRoles.includes(role || '')

    const handleClick = () => {
        const productIds = products?.map((p) => p._id!)
        dispatch(setFormData({ productIds }))
        navigate('products')
    }

    if (!hasAccess) return null

    return (
        <div
            className={classNames(
                'relative mx-auto w-full overflow-hidden',
                'aspect-square',
                'group flex items-center justify-center bg-white hover:bg-rose-500',
                'hover:border-white sm:rounded-md sm:border sm:border-gray-200',
                'dark:bg-black dark:text-white dark:hover:border-white dark:hover:bg-rose-600 dark:sm:border-neutral-700'
            )}
            onClick={handleClick}
        >
            <SquaresPlusIcon className="h-32 w-32 stroke-[0.5] text-neutral-700 group-hover:text-white dark:text-neutral-200" />
        </div>
    )
}
