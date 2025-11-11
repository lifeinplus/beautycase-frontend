import { useLocation, useNavigate } from 'react-router-dom'

import type { Product } from '@/features/products/types'
import { Image } from '@/shared/components/ui/image/Image'
import { ROUTES } from '@/shared/config/routes'
import { SelectTile } from './ui/SelectTile'

export interface ProductImagesProps {
    products?: Product[]
    viewMode?: boolean
}

export const ProductImages = ({
    products,
    viewMode = false,
}: ProductImagesProps) => {
    const { pathname, state } = useLocation()
    const navigate = useNavigate()

    const handleClick = (id?: string) => {
        navigate(ROUTES.products.details(id!), {
            state: {
                origin: state?.origin || pathname,
                prev: pathname,
            },
        })
    }

    return (
        <div className="mx-auto my-4 grid max-w-2xl grid-cols-3 gap-1 md:gap-7">
            {products?.map((p) => (
                <div
                    key={p._id}
                    className="relative mx-auto aspect-square w-full overflow-hidden"
                    onClick={() => handleClick(p._id)}
                >
                    <Image alt={p.name} src={p.imageUrl} />
                </div>
            ))}

            {!viewMode && <SelectTile products={products} />}
        </div>
    )
}
