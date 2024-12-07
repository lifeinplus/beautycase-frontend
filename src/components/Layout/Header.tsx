import AuthButton from '../../features/auth/AuthButton'

export const Header = () => {
    return (
        <div className="sticky top-0 border-b border-gray-300 dark:border-gray-700 sm:hidden">
            <header className="z-10 mx-auto flex max-w-4xl items-center justify-between bg-white px-5 py-3.5 dark:bg-black">
                <h1 className="font-logo text-2xl font-bold">
                    <a href="/">Beautycase</a>
                </h1>

                <div className="sm:hidden">
                    <AuthButton />
                </div>
            </header>
        </div>
    )
}
