import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectDarkMode, toggleTheme } from '.'

export function ThemeToggler() {
    const dispatch = useAppDispatch()
    const darkMode = useAppSelector(selectDarkMode)

    const handleThemeToggle = () => {
        const newTheme = !darkMode
        dispatch(toggleTheme())
        document.documentElement.classList.toggle('dark', newTheme)
        localStorage.setItem('darkMode', String(newTheme))
    }

    return darkMode ? (
        <button
            aria-label="Toggle Theme"
            className="adaptive-nav-bar__button-common"
            onClick={handleThemeToggle}
        >
            <MoonIcon className="h-6 w-6" />
            <span className="hidden lg:inline">Тёмный режим</span>
        </button>
    ) : (
        <button
            aria-label="Toggle Theme"
            className="adaptive-nav-bar__button-common"
            onClick={handleThemeToggle}
        >
            <SunIcon className="h-6 w-6" />
            <span className="hidden lg:inline">Светлый режим</span>
        </button>
    )
}
