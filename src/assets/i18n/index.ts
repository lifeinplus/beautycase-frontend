import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n.use(LanguageDetector)
    .use(Backend)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: '/assets/locales/{{lng}}/{{ns}}.json',
        },
        // debug: true,
        fallbackLng: 'ru',
        interpolation: {
            escapeValue: false,
        },
        ns: ['navigation'],
        supportedLngs: ['ru', 'en'],
    })

export default i18n
