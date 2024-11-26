import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectDarkMode, toggleTheme } from '.'

export function ThemeToggler() {
    const dispatch = useAppDispatch()
    const darkMode = useAppSelector(selectDarkMode)

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        }
    }, [darkMode])

    const handleThemeToggle = () => {
        const newTheme = !darkMode
        dispatch(toggleTheme())
        document.documentElement.classList.toggle('dark', newTheme)
        localStorage.setItem('darkMode', String(newTheme))
    }

    return (
        <button
            className="flex items-center gap-2 rounded-md hover:text-rose-500 sm:my-1 sm:p-3 lg:gap-4 dark:hover:text-rose-400"
            onClick={handleThemeToggle}
            aria-label="Toggle Theme"
        >
            {darkMode ? (
                <MoonIcon className="h-6 w-6" />
            ) : (
                <SunIcon className="h-6 w-6" />
            )}
            <span className="hidden lg:inline">
                {darkMode ? 'Тёмный режим' : 'Светлый режим'}
            </span>
        </button>
    )
}
