const Header = () => {
    return (
        <div className="sticky top-0 border-b border-gray-700 bg-black sm:hidden">
            <header className="z-10 mx-auto flex max-w-4xl items-center justify-between bg-black px-5 py-3.5 text-white">
                <h1 className="font-logo text-2xl font-bold">
                    <a href="/">Beautycase</a>
                </h1>

                <nav className="hidden space-x-6 md:flex" aria-label="main">
                    <a href="#stages" className="hover:text-gray-300">
                        Этапы
                    </a>
                    <a href="#brushes" className="hover:text-gray-300">
                        Кисти
                    </a>
                </nav>
            </header>
        </div>
    )
}

export default Header
