import { useGetToolsQuery } from '../features/api/apiSlice'
import Brand from './Brand'

interface Brand {
    name: string
    link: string
    tools: string[]
}

interface BrandsProps {
    brands: Brand[]
}

const Brands = ({ brands }: BrandsProps) => {
    const { data: tools } = useGetToolsQuery()

    return (
        <section id="brands" className="scroll-mt-header sm:scroll-mt-0">
            <h2 className="mb-6 pt-10 text-center font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
                Кисти
            </h2>
            {brands.map((brand, index) => {
                const filteredTools = tools?.filter((tool) =>
                    brand.tools.some((id) => id === tool._id)
                )
                return <Brand key={index} {...brand} tools={filteredTools} />
            })}
        </section>
    )
}

export default Brands
