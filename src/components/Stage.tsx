const Stage = ({ title, image, subtitle, steps, products }: any) => (
    <article className="p-4 my-4 bg-gray-100 dark:bg-gray-900">
        <h3 className="text-2xl font-bold text-center sm:text-3xl text-slate-900 dark:text-white">
            {title}
        </h3>

        <p className="text-lg mt-2 mb-6 text-center text-slate-700 dark:text-slate-400">
            {subtitle}
        </p>

        <img
            src={image}
            alt={title}
            className="w-full max-w-lg mx-auto my-4 rounded-md"
        />

        <p className="text-lg my-2 text-center sm:text-left text-slate-700 dark:text-slate-400">
            Шаги
        </p>
        <ul className="list-decimal list-outside ms-5">
            {steps.map((step: string, index: number) => (
                <li key={index} className="text-slate-700 dark:text-slate-400">
                    {step}
                </li>
            ))}
        </ul>

        <ul className="list-none mx-auto my-6 flex flex-col sm:flex-row items-center gap-8">
            {products.map((product: any, index: number) => (
                <li
                    key={index}
                    className="sm:w-5/6 flex flex-col items-center border border-solid border-slate-900 dark:border-gray-100 py-6 px-2 rounded-xl shadow-xl"
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-1/2 mb-6 rounded-md"
                    />
                    <h4 className="text-center text-slate-900 dark:text-white">
                        {product.name}
                    </h4>
                    <p className="text-sm text-center mt-2 text-slate-500 dark:text-slate-400">
                        Купить: {product.buy}
                    </p>
                </li>
            ))}
        </ul>
    </article>
);

export default Stage;
