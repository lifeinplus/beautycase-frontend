import classNames from 'classnames'

import { AuthButton } from '@/features/auth/components/AuthButton'
import { ThemeToggler } from '@/features/theme/ThemeToggler'
import navStyles from '@/shared/components/navigation/navigation.module.css'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'
import { LogoLink } from '../ui/LogoLink'

export const Header = () => (
    <nav className="sticky top-0 z-10 border-b border-neutral-300 dark:border-neutral-700 sm:hidden">
        <header className="mx-auto flex max-w-4xl items-center justify-between bg-white pe-0 ps-4 dark:bg-black">
            <h1 className={classNames(navStyles.navLogo, 'mb-1.5')}>
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
