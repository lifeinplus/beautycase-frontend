const Header = () => (
    <header className="bg-teal-700 text-white sticky top-0 z-10">
        <section className="max-w-4xl mx-auto p-4 flex justify-between items-center">
            <h1 className="text-3xl font-medium">
                <a href="#hero">👄 Beauty Case</a>
            </h1>
            <button
                id="mobile-open-button"
                className="text-3xl sm:hidden focus:outline-none"
            >
                &#9776;
            </button>
            <nav
                className="hidden sm:block space-x-8 text-xl"
                aria-label="main"
            >
                <a href="#stages" className="hover:opacity-80">
                    Этапы
                </a>
                <a href="#brushes" className="hover:opacity-80">
                    Кисти
                </a>
            </nav>
        </section>
    </header>
);

export default Header;
