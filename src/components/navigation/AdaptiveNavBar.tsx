import {
    ClipboardDocumentListIcon,
    ClipboardIcon,
    FilmIcon,
    QueueListIcon,
    RectangleGroupIcon,
    ScissorsIcon,
    ShoppingBagIcon,
} from '@heroicons/react/24/outline'
import { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { AuthButton, selectRole, selectUsername } from '../../features/auth'
import { ThemeToggler } from '../../features/theme'
import { canAccess, menuItems } from '../../utils'
import { NavigationButton } from './NavigationButton'

interface AdaptiveNavBarProps {
    children?: ReactNode
}

export const AdaptiveNavBar = ({ children }: AdaptiveNavBarProps) => {
    const location = useLocation()
    const navigate = useNavigate()

    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    const isActive = (path: string) => location.pathname === path

    const icons: { [key: string]: ReactNode } = {
        '/questionnaire': <ClipboardIcon className="h-6 w-6" />,
        '/questionnaires': <ClipboardDocumentListIcon className="h-6 w-6" />,
        '/makeup_bags': <ShoppingBagIcon className="h-6 w-6" />,
        '/products': <RectangleGroupIcon className="h-6 w-6" />,
        '/tools': <ScissorsIcon className="h-6 w-6" />,
        '/lessons': <FilmIcon className="h-6 w-6" />,
        '/stages': <QueueListIcon className="h-6 w-6" />,
    }

    const navItems = menuItems.map(({ label, path, auth, roles }) => ({
        auth,
        label,
        icon: icons[path],
        path,
        roles,
    }))

    const handleClick = (path: string) => {
        if (location.pathname === path) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            navigate(path)
        }
    }

    return (
        <aside className="adaptive-nav-bar">
            <div className="mt-3 hidden flex-col pb-10 pe-3 ps-4 pt-3 sm:flex">
                <h1 className="font-logo text-2xl font-bold">
                    <a href="/">
                        <span className="lg:hidden">B</span>
                        <span className="hidden lg:inline">Beautycase</span>
                    </a>
                </h1>
            </div>

            <div className="hidden w-full flex-row justify-evenly sm:flex sm:flex-col sm:justify-start">
                {navItems
                    .filter((item) => canAccess(item, username, role))
                    .map((item, index) => (
                        <NavigationButton
                            key={index}
                            className={
                                isActive(item.path) ? 'nav-btn-active' : ''
                            }
                            icon={item.icon}
                            onClick={() => handleClick(item.path)}
                            text={item.label}
                        />
                    ))}
            </div>

            <div className="flex w-full grow flex-row justify-evenly sm:mt-16 sm:flex-col sm:justify-start">
                {children}
            </div>

            <div className="hidden sm:inline">
                <div>
                    <ThemeToggler />
                </div>
                <div>
                    <AuthButton />
                </div>
            </div>
        </aside>
    )
}
