import type { Product } from '@/features/products/types'
import { ImageCard } from '@/shared/components/gallery/image-card/ImageCard'
import { ROUTES } from '@/shared/config/routes'
import { SelectTile } from './ui/SelectTile'

export interface ProductImagesProps {
    products?: Product[]
    viewMode?: boolean
}

export const ProductImages = ({
    products,
    viewMode = false,
}: ProductImagesProps) => (
    <div className="mx-auto my-4 grid max-w-2xl grid-cols-3 gap-1 md:gap-7">
        {products?.map((p) => (
            <ImageCard
                key={p._id}
                data={p}
                to={ROUTES.products.details(p._id!)}
            />
        ))}

        {!viewMode && <SelectTile products={products} />}
    </div>
)
