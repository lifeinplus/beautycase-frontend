import { LanguageIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { NavButton } from './navigation/NavButton'

export const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation('component')

    const currentLang = i18n.language === 'en' ? 'en' : 'ru'

    const toggleLanguage = () => {
        const newLang = currentLang === 'en' ? 'ru' : 'en'
        i18n.changeLanguage(newLang)
        localStorage.setItem('language', newLang)
    }

    return (
        <NavButton
            ariaLabel={t('language.ariaLabel')}
            icon={LanguageIcon}
            label={t('language.label')}
            onClick={toggleLanguage}
        />
    )
}
