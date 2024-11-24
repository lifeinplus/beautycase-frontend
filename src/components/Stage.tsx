const Stage = ({ title, image, subtitle, steps, products }: any) => (
    <article className="my-4 bg-gray-100 p-4 dark:bg-gray-900">
        <h3 className="text-center font-heading text-xl font-bold text-slate-900 sm:text-3xl dark:text-white">
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

        <p className="my-2 font-bold text-slate-700 sm:text-left dark:text-white">
            Шаги
        </p>
        <ul className="ms-5 list-outside list-decimal">
            {steps.map((step: string, index: number) => (
                <li key={index} className="text-slate-700 dark:text-white">
                    {step}
                </li>
            ))}
        </ul>

        <ul className="mx-auto my-6 flex list-none flex-col items-center gap-8 sm:flex-row">
            {products.map((product: any, index: number) => (
                <li
                    key={index}
                    className="flex flex-col items-center p-2 sm:w-5/6"
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="mb-6 w-1/2 rounded"
                    />
                    <h6 className="text-center font-heading text-sm text-slate-900 dark:text-white">
                        {product.name}
                    </h6>
                    <p className="mt-2 text-center text-sm text-slate-500 dark:text-gray-400">
                        Купить: {product.buy}
                    </p>
                </li>
            ))}
        </ul>
    </article>
)

export default Stage
