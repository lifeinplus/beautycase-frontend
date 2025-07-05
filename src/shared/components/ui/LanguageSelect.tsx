import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

const languages = [
    { code: 'ru', name: 'Русский' },
    { code: 'en', name: 'English' },
]

export const LanguageSelect = () => {
    const { i18n } = useTranslation()

    const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(event.target.value)
    }

    return (
        <select
            className="focus-outline bg-white py-2 pe-1 text-right text-sm text-gray-700 dark:bg-black dark:text-gray-400"
            onChange={handleLanguageChange}
            value={i18n.language}
        >
            {languages.map((language) => (
                <option key={language.code} value={language.code}>
                    {language.name}
                </option>
            ))}
        </select>
    )
}
