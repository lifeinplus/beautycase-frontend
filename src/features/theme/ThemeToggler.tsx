import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useTranslation } from 'react-i18next'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { NavButton } from '../../components/navigation/NavButton'
import { selectDarkMode, toggleTheme } from './themeSlice'

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

    return (
        <NavButton
            icon={darkMode ? MoonIcon : SunIcon}
            label={darkMode ? t('darkMode') : t('lightMode')}
            ariaLabel={darkMode ? t('buttonDarkMode') : t('buttonLightMode')}
            onClick={handleThemeToggle}
        />
    )
}
