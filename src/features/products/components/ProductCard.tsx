import { Link } from 'react-router-dom'

import { Product } from '../types'

interface ProductCardProps {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="image-container--square">
            <Link
                className="relative overflow-hidden"
                to={`/product_gallery/${product._id}`}
            >
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image sm:rounded"
                />
            </Link>
        </div>
    )
}
