import { AuthButton } from '../features/auth'

export const Header = () => {
    return (
        <nav className="sticky top-0 z-10 border-b border-gray-300 dark:border-gray-700 sm:hidden">
            <header className="mx-auto flex max-w-4xl items-center justify-between bg-white pe-0 ps-4 dark:bg-black">
                <h1 className="mb-1.5 font-logo text-2xl font-bold">
                    <a href="/">Beautycase</a>
                </h1>

                <div className="sm:hidden">
                    <AuthButton />
                </div>
            </header>
        </nav>
    )
}
