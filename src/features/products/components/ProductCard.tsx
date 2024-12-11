import { Link } from 'react-router-dom'

import { Product } from '../types'

interface ProductCardProps {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="makeup-item__image-container--square">
            <Link
                className="relative overflow-hidden"
                to={`/products/${product._id}`}
            >
                <img
                    src={product.image}
                    alt={product.name}
                    className="makeup-item__image sm:rounded"
                />
            </Link>
        </div>
    )
}
