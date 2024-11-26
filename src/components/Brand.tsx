const Brand = ({ link, name, products }: any) => (
    <article className="my-4 bg-gray-100 p-4 sm:rounded dark:bg-gray-900">
        <h3 className="text-center font-heading text-xl font-bold sm:text-2xl">
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-rose-400 decoration-double decoration-2 hover:decoration-wavy"
            >
                {name}
            </a>
        </h3>

        <ul className="mx-auto mt-6 flex list-none flex-col items-center gap-8 sm:flex-row">
            {products.map((product: any, index: number) => (
                <li
                    key={index}
                    className="flex flex-col items-center p-2 sm:w-5/6"
                >
                    <img
                        src={product.image}
                        alt={product.purpose}
                        className="mb-6 w-1/2 rounded"
                    />
                    <h6 className="text-center font-heading text-sm">
                        {product.name}
                    </h6>
                    {product.comment && (
                        <p className="mt-2 text-center text-sm text-slate-500 dark:text-gray-400">
                            {product.comment}
                        </p>
                    )}
                </li>
            ))}
        </ul>
    </article>
)

export default Brand
