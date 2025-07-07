import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import commonStyles from '@/shared/components/common/common.module.css'
import packageJson from '../../../../package.json'

function AppInfo() {
    const { t } = useTranslation(['navigation', 'home'])

    return (
        <section className="mx-auto hidden px-4 pt-4 text-xs text-neutral-500 dark:text-neutral-400 lg:flex lg:flex-col lg:gap-2">
            <p>
                <Link
                    className={classNames(
                        commonStyles.focusOutline,
                        commonStyles.hoverOutline,
                        commonStyles.textDanger
                    )}
                    to="/"
                >
                    Beautycase
                </Link>{' '}
                — {t('home:motto').toLocaleLowerCase()}
            </p>
            <p>
                {t('build')} {packageJson.version}
            </p>
        </section>
    )
}

export default AppInfo
