import classNames from 'classnames'
import { useLocation, useNavigate } from 'react-router-dom'

import type { Product } from '@/features/products/types'
import { Image } from '@/shared/components/ui/image/Image'
import imageStyles from '@/shared/components/ui/image/Image.module.css'
import styles from './ProductImages.module.css'
import { SelectTile } from './ui/SelectTile'

export interface ProductImagesProps {
    products?: Product[]
}

export const ProductImages = ({ products }: ProductImagesProps) => {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const handleProduct = (id?: string) => {
        navigate(`/products/${id}`, {
            state: { fromPathname: pathname },
        })
    }

    return (
        <div className={styles.container}>
            {products?.map((p) => (
                <div
                    key={p._id}
                    className={classNames(
                        imageStyles.container,
                        imageStyles.square
                    )}
                    onClick={() => handleProduct(p._id)}
                >
                    <Image alt={p.name} src={p.imageUrl} />
                </div>
            ))}

            <SelectTile products={products} />
        </div>
    )
}
