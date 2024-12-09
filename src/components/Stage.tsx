import { Product } from '../features/products'
import { ProductsList } from '../features/products/components/ProductList'

interface StageProps {
    title: string
    subtitle: string
    image: string
    steps: string[]
    products?: Product[]
}

const Stage = ({ title, subtitle, image, steps, products }: StageProps) => {
    return (
        <article className="my-4 bg-gray-100 p-4 dark:bg-gray-900 sm:rounded">
            <h3 className="text-center font-heading text-xl font-bold sm:text-2xl">
                {title}
            </h3>

            <h4 className="mb-6 mt-2 text-center font-heading text-lg text-slate-700 dark:text-slate-400">
                {subtitle}
            </h4>

            <img
                src={image}
                alt={title}
                className="mx-auto my-4 w-full max-w-lg rounded-md"
            />

            <p className="my-2 font-bold sm:text-left">Шаги</p>
            <ul className="ms-5 list-outside list-decimal">
                {steps.map((step: string, index: number) => (
                    <li key={index}>{step}</li>
                ))}
            </ul>

            {products && <ProductsList products={products} />}
        </article>
    )
}

export default Stage
