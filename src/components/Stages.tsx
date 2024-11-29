import { useGetProductsQuery } from '../features/api/apiSlice'
import Stage from './Stage'

interface Stage {
    title: string
    image: string
    subtitle: string
    steps: string[]
    products: string[]
}

interface StagesProps {
    stages: Stage[]
}

const Stages = ({ stages }: StagesProps) => {
    // const { data: products, isLoading, isError } = useGetProductsQuery()
    const { data: products } = useGetProductsQuery()

    return (
        <section id="stages" className="scroll-mt-header sm:scroll-mt-0">
            <h2 className="mb-6 pt-10 text-center font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
                Этапы
            </h2>

            {stages.map((stage, index) => {
                const filteredProducts = products?.filter((product) =>
                    stage.products.some((item) => item === product._id)
                )

                return (
                    <Stage key={index} {...stage} products={filteredProducts} />
                )
            })}
        </section>
    )
}

export default Stages
