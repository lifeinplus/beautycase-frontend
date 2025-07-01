import { AuthButton } from '../features/auth/components/AuthButton'
import { LogoLink } from './ui/LogoLink'

export const Header = () => (
    <nav className="sticky top-0 z-10 border-b border-neutral-300 dark:border-neutral-700 sm:hidden">
        <header className="mx-auto flex max-w-4xl items-center justify-between bg-white pe-0 ps-4 dark:bg-black">
            <h1 className="nav-logo mb-1.5">
                <LogoLink />
            </h1>

            <AuthButton />
        </header>
    </nav>
)
