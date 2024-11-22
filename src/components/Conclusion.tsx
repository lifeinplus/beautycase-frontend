const Conclusion = ({ title, contact, image, services }: any) => (
    <footer className="p-4 bg-gray-100 text-center">
        <img src={image} alt={title} className="w-full max-w-md mx-auto" />
        <h2 className="text-2xl font-bold mt-4">{title}</h2>
        <p className="text-lg">{contact}</p>
        <h3 className="font-semibold mt-4">{services.title}</h3>
        <p>{services.value}</p>
        <p>© 2024 Beauty Case</p>
    </footer>
);

export default Conclusion;
