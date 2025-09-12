import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import commonStyles from '@/shared/components/common/common.module.css'
import packageJson from '../../../../../package.json'
import styles from './AppInfo.module.css'

function AppInfo() {
    const { t } = useTranslation(['navigation', 'home'])

    return (
        <section className={styles.info}>
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
