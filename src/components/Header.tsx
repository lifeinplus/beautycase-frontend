import classNames from "classnames";
import { useState } from "react";

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    if (isSidebarOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }

    return (
        <div className="sticky top-0 bg-teal-700">
            <header
                className={classNames(
                    "flex",
                    "justify-between",
                    "items-center",
                    "p-4",
                    "bg-teal-700",
                    "text-white",
                    "max-w-4xl",
                    "mx-auto",
                    "z-10"
                )}
            >
                <h1 className="text-xl font-bold">
                    <a href="#hero">👄 Beauty Case</a>
                </h1>

                <button
                    className={classNames(
                        "sm:hidden",
                        "p-1",
                        "rounded-md",
                        "bg-teal-800",
                        "hover:bg-teal-600",
                        "focus:outline-none"
                    )}
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

                <nav className="hidden sm:flex space-x-6" aria-label="main">
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
                    "fixed",
                    "inset-y-0",
                    "left-0",
                    "w-64",
                    "bg-gray-900",
                    "text-white",
                    "z-30",
                    "transform",
                    `${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`,
                    "transition-transform",
                    "duration-300",
                    "sm:hidden"
                )}
            >
                <div className="flex justify-between items-center p-4">
                    <span className="text-xl font-bold">Menu</span>

                    <button
                        className={classNames(
                            "p-2 rounded-md bg-gray-700 hover:bg-gray-600 focus:outline-none"
                        )}
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

                <nav
                    className={classNames(
                        "flex",
                        "flex-col",
                        "space-y-4",
                        "p-4"
                    )}
                >
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
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 sm:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
};

export default Header;
