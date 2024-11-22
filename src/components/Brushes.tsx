import Brand from "./Brand";

const Brushes = ({ title, brands }: any) => (
    <section id="brushes" className="p-6 my-12 scroll-mt-20">
        <h2 className="text-4xl font-bold text-center sm:text-5xl mb-6 text-slate-900 dark:text-white">
            {title}
        </h2>
        {brands.map((brand: any, index: number) => (
            <Brand
                key={index}
                link={brand.link}
                name={brand.name}
                products={brand.products}
            />
        ))}
    </section>
);

export default Brushes;
