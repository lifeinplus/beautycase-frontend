import classNames from 'classnames'

import { AuthButton } from '@/features/auth/components/auth-button/AuthButton'
import { ThemeToggler } from '@/features/theme/toggler/ThemeToggler'
import logoStyles from '@/shared/styles/logo.module.css'
import { LanguageSwitcher } from '../../ui/language/switcher/LanguageSwitcher'
import { LogoLink } from '../../ui/logo-link/LogoLink'

export const Header = () => (
    <nav className="sticky top-0 z-10 border-b border-neutral-300 dark:border-neutral-700 sm:hidden">
        <header className="mx-auto flex max-w-4xl items-center justify-between bg-white pe-0 ps-4 dark:bg-black">
            <h1 className={classNames(logoStyles.logo, 'mb-1.5')}>
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
