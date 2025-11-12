import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ROUTES } from '@/shared/config/routes'
import packageJson from '../../../../../package.json'

function AppInfo() {
    const { t } = useTranslation(['navigation', 'home'])

    return (
        <section className="mx-auto hidden px-4 pt-4 text-xs text-neutral-500 lg:flex lg:flex-col lg:gap-2 dark:text-neutral-400">
            <p>
                <Link
                    className={classNames(
                        'text-rose-500 transition-all dark:text-rose-400',
                        'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed dark:focus-visible:outline-rose-700',
                        'hover:rounded hover:outline-4 hover:outline-offset-4 hover:outline-rose-400 hover:outline-dashed dark:hover:outline-rose-600'
                    )}
                    to={ROUTES.home}
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
