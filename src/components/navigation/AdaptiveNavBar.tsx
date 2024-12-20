import {
    FilmIcon,
    PaintBrushIcon,
    RectangleGroupIcon,
    ShoppingBagIcon,
} from '@heroicons/react/24/outline'
import { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { AuthButton } from '../../features/auth'
import { ThemeToggler } from '../../features/theme'

interface AdaptiveNavBarProps {
    children: ReactNode
}

export const AdaptiveNavBar = ({ children }: AdaptiveNavBarProps) => {
    const location = useLocation()
    const navigate = useNavigate()

    const isActive = (path: string) => location.pathname === path

    const navItems = [
        {
            path: '/makeup_bag',
            label: 'Косметичка',
            icon: <ShoppingBagIcon className="h-6 w-6" />,
        },
        {
            path: '/products',
            label: 'Продукты',
            icon: <RectangleGroupIcon className="h-6 w-6" />,
        },
        {
            path: '/tools',
            label: 'Инструменты',
            icon: <PaintBrushIcon className="h-6 w-6" />,
        },
        {
            path: '/lessons',
            label: 'Уроки',
            icon: <FilmIcon className="h-6 w-6" />,
        },
    ]

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
                {navItems.map((item, index) => (
                    <button
                        key={index}
                        className={`nav-btn ${
                            isActive(item.path) ? 'nav-btn-active' : ''
                        }`}
                        onClick={() => handleClick(item.path)}
                    >
                        {item.icon}
                        <span className="hidden lg:inline">{item.label}</span>
                    </button>
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
