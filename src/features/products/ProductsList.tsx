import { Product } from '../api/apiSlice'

interface ProductsProps {
    products: Product[]
}

export const ProductsList = ({ products }: ProductsProps) => {
    return (
        <ul className="mx-auto mt-6 flex list-none flex-col items-center gap-8 sm:flex-row">
            {products.map((product: any, index: number) => (
                <li
                    key={index}
                    className="flex flex-col items-center p-2 sm:w-5/6"
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="mb-6 w-1/2 rounded"
                    />
                    <h6 className="text-center font-heading text-sm">
                        {product.name}
                    </h6>
                    <p className="mt-2 text-center text-sm text-slate-500 dark:text-gray-400">
                        Купить: {product.buy}
                    </p>
                </li>
            ))}
        </ul>
    )
}
