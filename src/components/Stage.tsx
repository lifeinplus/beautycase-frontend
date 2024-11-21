const Stage = ({ title, image, subtitle, steps, products }: any) => (
    <section className="p-4 bg-white my-4 shadow-md rounded-md">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-lg text-gray-600">{subtitle}</p>
        <img src={image} alt={title} className="w-full max-w-lg mx-auto my-4" />
        <h3 className="font-semibold">Steps:</h3>
        <ul className="list-disc list-inside">
            {steps.map((step: string, index: number) => (
                <li key={index} className="text-gray-700">
                    {step}
                </li>
            ))}
        </ul>
        <h3 className="font-semibold mt-4">Recommended Products:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product: any, index: number) => (
                <div
                    key={index}
                    className="border p-2 rounded-md bg-gray-50 shadow-sm"
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-md"
                    />
                    <h4 className="font-semibold mt-2">{product.name}</h4>
                    <p className="text-sm text-gray-600">
                        Where to buy: {product.buy}
                    </p>
                </div>
            ))}
        </div>
    </section>
);

export default Stage;
