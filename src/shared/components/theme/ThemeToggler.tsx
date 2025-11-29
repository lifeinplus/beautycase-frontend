import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useTranslation } from 'react-i18next'

import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import { selectDarkMode, toggleTheme } from '@/app/ui/theme/themeSlice'
import { NavButton } from '@/shared/components/navigation/nav-button/NavButton'

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
            aria-label={
                darkMode
                    ? t('buttons.darkMode.ariaLabel')
                    : t('buttons.lightMode.ariaLabel')
            }
            icon={darkMode ? MoonIcon : SunIcon}
            label={
                darkMode
                    ? t('buttons.darkMode.text')
                    : t('buttons.lightMode.text')
            }
            onClick={handleThemeToggle}
        />
    )
}
