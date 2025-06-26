import { LanguageIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

export const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation('component')

    const currentLang = i18n.language === 'en' ? 'en' : 'ru'

    const toggleLanguage = () => {
        const newLang = currentLang === 'en' ? 'ru' : 'en'
        i18n.changeLanguage(newLang)
        localStorage.setItem('language', newLang)
    }

    return (
        <button
            aria-label={t('language.ariaLabel')}
            onClick={toggleLanguage}
            className="nav-btn nav-btn-common"
        >
            <LanguageIcon className="h-6 w-6" />
            <span className="hidden lg:inline">{t('language.label')}</span>
        </button>
    )
}
