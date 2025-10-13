import classNames from 'classnames'
import { Children, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { menuItems } from '@/app/config/menu'
import { useAppSelector } from '@/app/hooks/hooks'
import AppInfo from '@/app/layout/nav-bar/ui/AppInfo'
import { AuthButton } from '@/features/auth/components/auth-button/AuthButton'
import { selectRole, selectUsername } from '@/features/auth/slice/authSlice'
import { ThemeToggler } from '@/features/theme/toggler/ThemeToggler'
import { NavButton } from '@/shared/components/navigation/nav-button/NavButton'
import { LanguageSwitcher } from '@/shared/components/ui/language/switcher/LanguageSwitcher'
import { LogoLink } from '@/shared/components/ui/logo-link/LogoLink'
import { canAccess } from '@/shared/lib/access/canAccess'

export interface NavBarProps {
    children?: ReactNode
}

export const NavBar = ({ children }: NavBarProps) => {
    const location = useLocation()
    const navigate = useNavigate()
    const { t } = useTranslation(['navigation', 'home'])

    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    const isActive = (path: string) => {
        return (
            location.pathname === path ||
            location.pathname.startsWith(path + '/')
        )
    }

    const handleClick = (path: string) => {
        if (location.pathname === path) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            navigate(path)
        }
    }

    const childrenArray = Children.toArray(children)

    return (
        <aside
            className={classNames(
                'pb-safe-bottom fixed bottom-0 left-0 z-20 w-full overflow-y-auto bg-white',
                'border-t border-neutral-200 sm:border-e sm:border-t-0',
                'sm:h-full sm:w-auto sm:flex-col sm:px-3 sm:pt-2 sm:pb-5',
                'lg:w-navbar-open',
                'dark:border-neutral-700 dark:bg-black',
                childrenArray.length ? 'flex' : 'hidden md:flex'
            )}
        >
            <div className="mt-3 hidden flex-col ps-4 pe-3 pt-3 pb-10 sm:flex">
                <h2 className="font-logo text-2xl">
                    <LogoLink>
                        <span className="lg:hidden">B</span>
                        <span className="hidden lg:inline">Beautycase</span>
                    </LogoLink>
                </h2>
            </div>

            <div className="hidden w-full flex-row justify-evenly sm:flex sm:flex-col sm:justify-start">
                {menuItems
                    .filter((item) => canAccess(item, username, role))
                    .map((item, index) => (
                        <NavButton
                            key={index}
                            className={classNames(
                                isActive(item.path) &&
                                    'text-rose-500 dark:text-rose-400'
                            )}
                            icon={item.icon}
                            onClick={() => handleClick(item.path)}
                            label={t(item.label)}
                        />
                    ))}
            </div>

            <div
                className={classNames(
                    'flex w-full grow flex-row justify-evenly sm:my-10 sm:flex sm:flex-col sm:justify-start'
                )}
            >
                {children}
            </div>

            <div className="hidden w-full flex-row justify-evenly sm:flex sm:flex-col sm:justify-start">
                <LanguageSwitcher />
                <ThemeToggler />
                <AuthButton />
            </div>

            <AppInfo />
        </aside>
    )
}
