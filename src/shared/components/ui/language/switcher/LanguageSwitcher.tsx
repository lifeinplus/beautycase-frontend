import { LanguageIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

import { NavButton } from '../../../navigation/nav-button/NavButton'

export const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation('language')

    const currentLang = i18n.language === 'en' ? 'en' : 'ru'

    const toggleLanguage = () => {
        const newLang = currentLang === 'en' ? 'ru' : 'en'
        i18n.changeLanguage(newLang)
        localStorage.setItem('language', newLang)
    }

    return (
        <NavButton
            aria-label={t('buttons.language.ariaLabel')}
            icon={LanguageIcon}
            label={t('buttons.language.text')}
            onClick={toggleLanguage}
        />
    )
}
