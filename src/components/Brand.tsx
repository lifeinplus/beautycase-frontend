const Brand = ({ link, name, products }: any) => (
    <article className="my-4 bg-gray-100 p-4 dark:bg-gray-900">
        <h3 className="text-center font-heading text-xl font-semibold">
            {name}
        </h3>

        <h4 className="mb-6 mt-2 text-center font-heading text-lg text-slate-700 dark:text-slate-400">
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-rose-400 decoration-2 hover:decoration-wavy"
            >
                {link}
            </a>
        </h4>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {products.map((product: any, index: number) => (
                <div key={index} className="justify-items-center p-2">
                    <img
                        src={product.image}
                        alt={product.purpose}
                        className="mb-6 w-1/2 rounded"
                    />
                    <h6 className="text-center font-heading text-sm text-slate-900 dark:text-white">
                        {product.name}
                    </h6>
                    {product.comment && (
                        <p className="mt-2 text-center text-sm text-slate-500 dark:text-gray-400">
                            {product.comment}
                        </p>
                    )}
                </div>
            ))}
        </div>
    </article>
)

export default Brand
