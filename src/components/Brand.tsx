const Brand = ({ link, name, products }: any) => (
    <div className="my-4">
        <h3 className="text-lg font-semibold text-center mt-12 mb-6">
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
            >
                {name}
            </a>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product: any, index: number) => (
                <div
                    key={index}
                    className="justify-items-center border border-solid border-slate-900 dark:border-gray-100 py-6 px-2 rounded-xl shadow-xl"
                >
                    <img
                        src={product.image}
                        alt={product.purpose}
                        className="w-1/2 mb-6 rounded-md"
                    />
                    <h4 className="text-center text-slate-900 dark:text-white">
                        {product.purpose}
                    </h4>
                    {product.comment && (
                        <p className="text-sm text-center mt-2 text-slate-500 dark:text-slate-400">
                            {product.comment}
                        </p>
                    )}
                </div>
            ))}
        </div>
    </div>
);

export default Brand;
