import { ReactNode } from 'react'

import AuthButton from '../features/auth/AuthButton'
import { ThemeToggler } from '../features/theme'

interface AdaptiveNavBarProps {
    children: ReactNode
}

export const AdaptiveNavBar = ({ children }: AdaptiveNavBarProps) => (
    <aside className="adaptive-nav-bar">
        <div className="mt-3 hidden flex-col pb-10 pe-3 ps-4 pt-3 sm:flex">
            <h1 className="font-logo text-2xl font-bold">
                <a href="/">
                    <span className="lg:hidden">B</span>
                    <span className="hidden lg:inline">Beautycase</span>
                </a>
            </h1>
        </div>

        <div className="flex w-full grow flex-row justify-evenly sm:flex-col sm:justify-start">
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
