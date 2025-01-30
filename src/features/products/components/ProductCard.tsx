import { Link } from 'react-router-dom'

import { Product } from '../types'

interface ProductCardProps {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="img-container img-container-square">
            <Link
                className="relative overflow-hidden"
                to={`/products/${product._id}`}
            >
                <img
                    alt={product.name}
                    className="img img-sm-rounded"
                    src={product.imageUrl}
                />
            </Link>
        </div>
    )
}
