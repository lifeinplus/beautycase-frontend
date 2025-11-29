import { AuthButton } from '@/features/auth/components/auth-button/AuthButton'
import { ThemeToggler } from '@/shared/components/theme/ThemeToggler'
import { LanguageSwitcher } from '../../ui/language/switcher/LanguageSwitcher'
import { LogoLink } from '../../ui/logo-link/LogoLink'

export const Header = () => (
    <nav className="sticky top-0 z-10 border-b border-neutral-300 md:hidden dark:border-neutral-700">
        <header className="pt-safe-top mx-auto flex max-w-4xl items-center justify-between bg-white ps-4 pe-0 dark:bg-black">
            <h1 className="font-logo mb-1.5 text-2xl">
                <LogoLink />
            </h1>

            <div className="flex">
                <LanguageSwitcher />
                <ThemeToggler />
                <AuthButton />
            </div>
        </header>
    </nav>
)
