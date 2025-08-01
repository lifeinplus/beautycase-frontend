import classNames from 'classnames'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks'
import { selectRole, selectUsername } from '@/features/auth/authSlice'
import { AuthButton } from '@/features/auth/components/AuthButton'
import { ThemeToggler } from '@/features/theme/ThemeToggler'
import commonStyles from '@/shared/components/common/common.module.css'
import { canAccess, menuItems } from '@/shared/utils/menu'
import AppInfo from '../common/AppInfo'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'
import { LogoLink } from '../ui/LogoLink'
import styles from './NavBar.module.css'
import { NavButton } from './NavButton'
import navStyles from './navigation.module.css'

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

    return (
        <aside className={styles.navBar}>
            <div className={styles.logoContainer}>
                <h2 className={navStyles.navLogo}>
                    <LogoLink>
                        <span className="lg:hidden">B</span>
                        <span className="hidden lg:inline">Beautycase</span>
                    </LogoLink>
                </h2>
            </div>

            <div className={classNames(styles.btnContainer)}>
                {menuItems
                    .filter((item) => canAccess(item, username, role))
                    .map((item, index) => (
                        <NavButton
                            key={index}
                            className={
                                isActive(item.path)
                                    ? commonStyles.textDanger
                                    : ''
                            }
                            icon={item.icon}
                            onClick={() => handleClick(item.path)}
                            label={t(item.label)}
                        />
                    ))}
            </div>

            <div
                className={classNames(
                    styles.btnContainer,
                    'flex grow sm:my-10'
                )}
            >
                {children}
            </div>

            <div className={classNames(styles.btnContainer)}>
                <LanguageSwitcher />
                <ThemeToggler />
                <AuthButton />
            </div>

            <AppInfo />
        </aside>
    )
}
