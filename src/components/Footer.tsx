import { useTranslation } from 'react-i18next'

import packageJson from '../../package.json'

export const Footer = () => {
    const { t } = useTranslation('component')

    return (
        <footer id="footer" className="page-footer">
            <section className="mx-auto max-w-4xl p-4">
                <h4 className="font-heading text-lg">{t('footer.thanks')}</h4>
            </section>

            <section className="mx-auto flex max-w-4xl flex-col gap-4 p-4 sm:flex-row sm:justify-between">
                <p>
                    {t('footer.questions')}:{' '}
                    <a
                        href="tel:+381629446904"
                        className="text-rose-500 hover:underline hover:decoration-wavy dark:text-rose-400"
                    >
                        +381 62 9446 904 ({t('footer.country')})
                    </a>{' '}
                    {t('footer.help')}
                </p>
                <p>{t('footer.services')}</p>
            </section>

            <section className="mx-auto max-w-4xl p-4">
                <p>&copy; Beautycase {packageJson.version}</p>
            </section>
        </footer>
    )
}
