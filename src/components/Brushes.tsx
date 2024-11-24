import Brand from './Brand'

const Brushes = ({ brushes }: { brushes: any[] }) => (
    <section id="brushes" className="scroll-mt-20 p-6">
        <h2 className="mb-6 text-center font-heading text-3xl font-bold text-slate-900 sm:text-5xl dark:text-white">
            Кисти
        </h2>
        {brushes.map((brand: any, index: number) => (
            <Brand
                key={index}
                link={brand.link}
                name={brand.name}
                products={brand.products}
            />
        ))}
    </section>
)

export default Brushes
