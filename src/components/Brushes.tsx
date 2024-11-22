const Brushes = ({ title, brands }: any) => (
    <section id="brushes" className="p-6 my-12 scroll-mt-20">
        <h2 className="text-4xl font-bold text-center sm:text-5xl mb-6 text-slate-900 dark:text-white">
            {title}
        </h2>
        {brands.map((brand: any, index: number) => (
            <div key={index} className="my-4">
                <h3 className="text-lg font-semibold">
                    <a
                        href={brand.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                    >
                        {brand.name}
                    </a>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {brand.products.map(
                        (product: any, productIndex: number) => (
                            <div
                                key={productIndex}
                                className="border p-2 rounded-md bg-white shadow-sm"
                            >
                                <img
                                    src={product.image}
                                    alt={product.purpose}
                                    className="w-full h-32 object-cover rounded-md"
                                />
                                <p className="text-gray-700">
                                    {product.purpose}
                                </p>
                                {product.comment && (
                                    <p className="text-sm text-gray-500">
                                        Note: {product.comment}
                                    </p>
                                )}
                            </div>
                        )
                    )}
                </div>
            </div>
        ))}
    </section>
);

export default Brushes;
