import ProductCard from "./components/ProductCard";

const App = () => {
    const products = [
        {
            name: "Hydrating Serum",
            price: "$25",
            imageUrl: "https://via.placeholder.com/150",
            description: "Keeps your skin hydrated all day.",
            purchaseLink: "#",
        },
        {
            name: "Matte Lipstick",
            price: "$15",
            imageUrl: "https://via.placeholder.com/150",
            description: "Rich color with a matte finish.",
            purchaseLink: "#",
        },
    ];

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8">
                Recommended Products
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                    <ProductCard key={index} {...product} />
                ))}
            </div>
        </div>
    );
};

export default App;
