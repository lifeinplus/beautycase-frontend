import classNames from 'classnames'
import { Children, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { menuItems } from '@/app/config/menu'
import { useAppSelector } from '@/app/hooks/hooks'
import { AuthButton } from '@/features/auth/components/auth-button/AuthButton'
import { selectRole, selectUsername } from '@/features/auth/slice/authSlice'
import { ThemeToggler } from '@/features/theme/toggler/ThemeToggler'
import AppInfo from '@/shared/components/common/app-info/AppInfo'
import commonStyles from '@/shared/components/common/common.module.css'
import { NavButton } from '@/shared/components/navigation/nav-button/NavButton'
import { LanguageSwitcher } from '@/shared/components/ui/language/switcher/LanguageSwitcher'
import { LogoLink } from '@/shared/components/ui/logo-link/LogoLink'
import { canAccess } from '@/shared/lib/access/canAccess'
import logoStyles from '@/shared/styles/logo.module.css'
import styles from './NavBar.module.css'

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
                styles.container,
                childrenArray.length
                    ? styles.containerFlex
                    : styles.containerMobile
            )}
        >
            <div className={styles.logo}>
                <h2 className={logoStyles.logo}>
                    <LogoLink>
                        <span className="lg:hidden">B</span>
                        <span className="hidden lg:inline">Beautycase</span>
                    </LogoLink>
                </h2>
            </div>

            <div className={classNames(styles.button)}>
                {menuItems
                    .filter((item) => canAccess(item, username, role))
                    .map((item, index) => (
                        <NavButton
                            key={index}
                            className={classNames(
                                isActive(item.path) && commonStyles.textDanger
                            )}
                            icon={item.icon}
                            onClick={() => handleClick(item.path)}
                            label={t(item.label)}
                        />
                    ))}
            </div>

            <div className={classNames(styles.button, styles.buttonMobile)}>
                {children}
            </div>

            <div className={classNames(styles.button)}>
                <LanguageSwitcher />
                <ThemeToggler />
                <AuthButton />
            </div>

            <AppInfo />
        </aside>
    )
}
