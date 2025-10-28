import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import config from '@/app/config/config'
import { Link } from '../../ui/link/Link'

export const Footer = () => {
    const { t } = useTranslation('component')

    return (
        <footer
            id="footer"
            className={classNames(
                'pb-safe-bottom mb-2 border-t border-gray-300',
                'sm:ms-navbar lg:ms-navbar-open',
                'dark:border-gray-700'
            )}
        >
            <section className="mx-auto max-w-4xl p-4">
                <h4 className="font-heading text-lg">{t('footer.thanks')}</h4>
            </section>

            <section className="mx-auto flex max-w-4xl flex-col gap-4 p-4 sm:flex-row sm:justify-between">
                <p>
                    <span>{t('footer.questions')}:</span>{' '}
                    <Link
                        url={`tel:${config.contactPhone}`}
                        text={`${t('footer.phone')}`}
                    />{' '}
                    <span className={'text-rose-500 dark:text-rose-400'}>
                        ({t('footer.country')})
                    </span>{' '}
                    <span>{t('footer.help')}</span>
                </p>
                <p>{t('footer.services')}</p>
            </section>
        </footer>
    )
}
