import { Link } from 'react-router-dom'

import config from '../../../config'
import { type Product } from '../../products'

interface ProductCardProps {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => (
    <div className="img-container img-container-square">
        <Link
            className="relative overflow-hidden"
            to={`/products/${product._id}`}
        >
            <img
                alt={product.name}
                className="img"
                onError={(e) => {
                    e.currentTarget.alt = 'Default Image'
                    e.currentTarget.src = config.cloudinary.defaultThumbnailUrl
                }}
                src={product.imageUrl}
            />
        </Link>
    </div>
)
