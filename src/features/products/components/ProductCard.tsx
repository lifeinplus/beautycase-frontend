import { Link } from 'react-router-dom'

import { Product } from '../types'

interface ProductCardProps {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="square-image-container">
            <Link
                className="relative overflow-hidden"
                to={`/product_gallery/${product._id}`}
            >
                <img
                    src={product.image}
                    alt={product.name}
                    className="square-image sm:rounded"
                />
            </Link>
        </div>
    )
}
