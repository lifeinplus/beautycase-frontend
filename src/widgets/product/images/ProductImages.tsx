import { useLocation, useNavigate } from 'react-router-dom'

import type { Product } from '@/features/products/types'
import { Image } from '@/shared/components/ui/image/Image'
import { ROUTES } from '@/shared/config/routes'
import { SelectTile } from './ui/SelectTile'

export interface ProductImagesProps {
    products?: Product[]
}

export const ProductImages = ({ products }: ProductImagesProps) => {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const handleProduct = (id?: string) => {
        navigate(ROUTES.public.products.details(id!), {
            state: { fromPathname: pathname },
        })
    }

    return (
        <div className="mx-auto my-4 grid max-w-2xl grid-cols-3 gap-1 sm:gap-7">
            {products?.map((p) => (
                <div
                    key={p._id}
                    className="relative mx-auto aspect-square w-full overflow-hidden"
                    onClick={() => handleProduct(p._id)}
                >
                    <Image alt={p.name} src={p.imageUrl} />
                </div>
            ))}

            <SelectTile products={products} />
        </div>
    )
}
