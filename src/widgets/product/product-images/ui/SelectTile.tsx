import { SquaresPlusIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import { selectRole } from '@/features/auth/slice/authSlice'
import { setFormData } from '@/features/form/slice/formSlice'
import type { Product } from '@/features/products/types'
import imageStyles from '@/shared/components/ui/image/Image.module.css'
import styles from './SelectTile.module.css'

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
                imageStyles.container,
                imageStyles.square,
                styles.tile
            )}
            onClick={handleClick}
        >
            <SquaresPlusIcon className={styles.icon} />
        </div>
    )
}
