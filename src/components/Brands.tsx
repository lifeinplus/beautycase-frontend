import { useGetBrandsQuery } from '../features/api/apiSlice'
import Brand from './Brand'

const Brands = () => {
    const { data: brands } = useGetBrandsQuery()

    return (
        <section id="brands" className="scroll-mt-header sm:scroll-mt-0">
            <h2 className="mb-6 pt-10 text-center font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
                Кисти
            </h2>
            {brands?.map((brand, index) => (
                <Brand
                    key={index}
                    name={brand.name}
                    link={brand.link}
                    tools={brand.toolIds}
                />
            ))}
        </section>
    )
}

export default Brands
