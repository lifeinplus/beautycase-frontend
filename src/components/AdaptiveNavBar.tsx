import { ReactNode } from 'react'

import AuthButton from '../features/auth/AuthButton'
import { ThemeToggler } from '../features/theme'

interface AdaptiveNavBarProps {
    children: ReactNode
}

export const AdaptiveNavBar = ({ children }: AdaptiveNavBarProps) => (
    <aside className="fixed bottom-0 left-0 z-20 flex w-full border-t border-gray-300 bg-white dark:border-gray-700 dark:bg-black sm:h-full sm:w-auto sm:flex-col sm:border-e sm:border-t-0 sm:px-3 sm:pb-5 sm:pt-2 lg:w-navbar-left-open">
        <div className="mt-3 hidden flex-col px-3 pb-10 pt-3 sm:flex">
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
