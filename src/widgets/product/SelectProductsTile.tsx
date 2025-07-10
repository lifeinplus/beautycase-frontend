import { SquaresPlusIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { setFormData } from '@/features/form/formSlice'
import type { Product } from '@/features/products/types'
import imageStyles from '@/shared/components/ui/image.module.css'
import styles from './SelectProductsTile.module.css'

export interface ProductTileButtonProps {
    products?: Product[]
}

const SelectProductsTile = ({ products }: ProductTileButtonProps) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleClick = () => {
        const productIds = products?.map((p) => p._id!)
        dispatch(setFormData({ productIds }))
        navigate('products')
    }

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

export default SelectProductsTile
