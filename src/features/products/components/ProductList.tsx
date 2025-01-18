import { useNavigate } from 'react-router-dom'

import { useScrollToElement } from '../../../hooks'
import type { Product } from '../types'

interface ProductsListProps {
    products: Product[]
}

export const ProductsList = ({ products }: ProductsListProps) => {
    const { pathname, state, scroll } = useScrollToElement()
    const navigate = useNavigate()

    const handleClick = (id?: string) => {
        navigate(`/products/${id}`, {
            state: { fromPathname: pathname },
        })
    }

    return (
        <ul className="mx-auto mt-6 flex list-none flex-col items-center gap-8 sm:flex-row">
            {products.map((product, index) => (
                <li
                    key={index}
                    className="flex w-full flex-col items-center p-2"
                    onClick={() => handleClick(product._id)}
                    ref={product._id === state?.scrollId ? scroll : null}
                >
                    <img
                        alt={product.name}
                        className="mb-6 w-1/2 rounded"
                        src={product.image}
                    />
                    <h6 className="text-center font-heading text-sm">
                        {product.name}
                    </h6>
                </li>
            ))}
        </ul>
    )
}
