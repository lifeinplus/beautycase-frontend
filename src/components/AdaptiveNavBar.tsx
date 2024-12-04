import {
    PaintBrushIcon,
    ShoppingBagIcon,
    ListBulletIcon,
} from '@heroicons/react/24/outline'

import { ThemeToggler } from '../features/theme'
import AuthButton from '../features/auth/AuthButton'

const AdaptiveNavBar = () => (
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
            <button
                className="my-1 flex p-2 hover:text-rose-500 dark:hover:text-rose-400 sm:p-3 lg:gap-4"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <ShoppingBagIcon className="h-6 w-6" />
                <span className="hidden lg:inline">Косметичка</span>
            </button>

            <button
                className="my-1 flex p-2 hover:text-rose-500 dark:hover:text-rose-400 sm:p-3 lg:gap-4"
                onClick={() =>
                    document
                        .getElementById('stages')
                        ?.scrollIntoView({ behavior: 'smooth' })
                }
            >
                <ListBulletIcon className="h-6 w-6" />
                <span className="hidden lg:inline">Этапы</span>
            </button>

            <button
                className="my-1 flex p-2 hover:text-rose-500 dark:hover:text-rose-400 sm:p-3 lg:gap-4"
                onClick={() =>
                    document
                        .getElementById('brands')
                        ?.scrollIntoView({ behavior: 'smooth' })
                }
            >
                <PaintBrushIcon className="h-6 w-6" />
                <span className="hidden lg:inline">Кисти</span>
            </button>

            <ThemeToggler />
        </div>

        <div className="hidden sm:inline">
            <AuthButton />
        </div>
    </aside>
)

export default AdaptiveNavBar
