import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import commonStyles from '@/shared/components/common/common.module.css'
import styles from './Footer.module.css'

export const Footer = () => {
    const { t } = useTranslation('component')

    return (
        <footer id="footer" className={styles.footer}>
            <section className="mx-auto max-w-4xl p-4">
                <h4 className="font-heading text-lg">{t('footer.thanks')}</h4>
            </section>

            <section className="mx-auto flex max-w-4xl flex-col gap-4 p-4 sm:flex-row sm:justify-between">
                <p>
                    <span>{t('footer.questions')}:</span>{' '}
                    <a
                        href="tel:+381629446904"
                        className={classNames(
                            commonStyles.focusOutline,
                            commonStyles.hoverOutline,
                            commonStyles.textDanger
                        )}
                    >
                        {t('footer.phone')}
                    </a>{' '}
                    <span className={commonStyles.textDanger}>
                        ({t('footer.country')})
                    </span>{' '}
                    <span>{t('footer.help')}</span>
                </p>
                <p>{t('footer.services')}</p>
            </section>
        </footer>
    )
}
