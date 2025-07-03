import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { selectRole, selectUsername } from '../../features/auth/authSlice'
import { AuthButton } from '../../features/auth/components/AuthButton'
import { ThemeToggler } from '../../features/theme/ThemeToggler'
import { canAccess, menuItems } from '../../utils/menu'
import { LogoLink } from '../ui/LogoLink'
import AppInfo from '../AppInfo'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { NavButton } from './NavButton'

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
        <aside className="nav-bar">
            <div className="nav-logo-container">
                <h2 className="nav-logo">
                    <LogoLink>
                        <span className="lg:hidden">B</span>
                        <span className="hidden lg:inline">Beautycase</span>
                    </LogoLink>
                </h2>
            </div>

            <div className="nav-btn-container hidden sm:flex">
                {menuItems
                    .filter((item) => canAccess(item, username, role))
                    .map((item, index) => (
                        <NavButton
                            key={index}
                            className={isActive(item.path) ? 'text-danger' : ''}
                            icon={item.icon}
                            onClick={() => handleClick(item.path)}
                            label={t(item.label)}
                        />
                    ))}
            </div>

            <div className="nav-btn-container flex grow sm:my-10">
                {children}
            </div>

            <div className="hidden sm:inline">
                <LanguageSwitcher />
                <ThemeToggler />
                <AuthButton />
                <AppInfo />
            </div>
        </aside>
    )
}
