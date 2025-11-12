import classNames from 'classnames'
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
            className={classNames(
                'bg-white py-2 pe-1 text-right text-sm text-gray-700 transition-all dark:bg-black dark:text-gray-400 dark:focus-visible:outline-rose-700',
                'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed'
            )}
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
