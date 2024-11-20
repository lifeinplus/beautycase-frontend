interface ProductProps {
    name: string;
    price: string;
    imageUrl: string;
    description: string;
    purchaseLink: string;
}

const ProductCard: React.FC<ProductProps> = ({
    name,
    price,
    imageUrl,
    description,
    purchaseLink,
}) => (
    <div className="rounded-lg shadow-lg bg-white p-4">
        <img
            src={imageUrl}
            alt={name}
            className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="mt-4">
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-gray-600">{description}</p>
            <p className="text-blue-500 font-semibold mt-2">{price}</p>
            <a
                href={purchaseLink}
                className="text-sm text-white bg-blue-500 px-4 py-2 rounded mt-4 inline-block"
            >
                Buy Now
            </a>
        </div>
    </div>
);

export default ProductCard;
