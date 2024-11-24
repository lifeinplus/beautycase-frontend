import classNames from 'classnames'
import { useState } from 'react'

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    if (isSidebarOpen) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'auto'
    }

    return (
        <div className="sticky top-0 border-b border-gray-700 bg-black">
            <header className="z-10 mx-auto flex max-w-4xl items-center justify-between bg-black px-5 py-3.5 text-white">
                <h1 className="font-logo text-2xl font-bold">
                    <a href="#hero">Beautycase</a>
                </h1>

                <button
                    className="rounded-md hover:bg-gray-800 focus:outline-none sm:hidden"
                    onClick={toggleSidebar}
                    aria-label="Toggle menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>

                <nav className="hidden space-x-6 sm:flex" aria-label="main">
                    <a href="#stages" className="hover:text-gray-300">
                        Этапы
                    </a>
                    <a href="#brushes" className="hover:text-gray-300">
                        Кисти
                    </a>
                </nav>
            </header>

            <aside
                className={classNames(
                    'fixed inset-y-0 left-0 z-30 w-64 transform bg-gray-900 text-white transition-transform duration-300 sm:hidden',
                    `${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
                )}
            >
                <div className="flex items-center justify-between p-4">
                    <span className="text-xl font-bold">Menu</span>

                    <button
                        className="rounded-md bg-gray-700 p-2 hover:bg-gray-600 focus:outline-none"
                        onClick={toggleSidebar}
                        aria-label="Close menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <nav className="flex flex-col space-y-4 p-4">
                    <a
                        href="#stages"
                        className="hover:text-gray-300"
                        onClick={toggleSidebar}
                    >
                        Этапы
                    </a>
                    <a
                        href="#brushes"
                        className="hover:text-gray-300"
                        onClick={toggleSidebar}
                    >
                        Кисти
                    </a>
                </nav>
            </aside>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-50 sm:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    )
}

export default Header
