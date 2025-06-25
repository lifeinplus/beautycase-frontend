import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectDarkMode, toggleTheme } from './themeSlice'
import { useTranslation } from 'react-i18next'

export function ThemeToggler() {
    const { t } = useTranslation('theme')

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
            aria-label={t('buttonDarkMode')}
            className="nav-btn nav-btn-common"
            onClick={handleThemeToggle}
        >
            <MoonIcon className="h-6 w-6" />
            <span className="hidden lg:inline">{t('darkMode')}</span>
        </button>
    ) : (
        <button
            aria-label={t('buttonLightMode')}
            className="nav-btn nav-btn-common"
            onClick={handleThemeToggle}
        >
            <SunIcon className="h-6 w-6" />
            <span className="hidden lg:inline">{t('lightMode')}</span>
        </button>
    )
}
