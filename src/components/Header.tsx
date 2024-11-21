const Header = ({
    title,
    subtitle,
    image,
}: {
    title: string;
    subtitle: string;
    image: string;
}) => (
    <header className="text-center p-4 bg-gray-100">
        <img src={image} alt={title} className="w-full max-w-md mx-auto" />
        <h1 className="text-4xl font-bold mt-4">{title}</h1>
        <p className="text-xl text-gray-600">{subtitle}</p>
    </header>
);

export default Header;
