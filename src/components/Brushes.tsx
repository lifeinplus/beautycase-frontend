import Brand from './Brand'

const Brushes = ({ brushes }: { brushes: any[] }) => (
    <section id="brushes" className="scroll-mt-header sm:scroll-mt-0">
        <h2 className="mb-6 pt-10 text-center font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
            Кисти
        </h2>
        {brushes.map((brand: any, index: number) => (
            <Brand key={index} {...brand} />
        ))}
    </section>
)

export default Brushes
