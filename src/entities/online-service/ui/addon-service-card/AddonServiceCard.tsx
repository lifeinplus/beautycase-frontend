import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import config from '@/app/config'
import commonStyles from '@/shared/components/common/common.module.css'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import styles from './AddonServiceCard.module.css'

interface AddonServiceCardProps {
    name: string
    blurb: string
}

export const AddonServiceCard = ({ name, blurb }: AddonServiceCardProps) => {
    const { t } = useTranslation('pricing')

    return (
        <div className={styles.container}>
            <h4 className={styles.name}>{name}</h4>
            <p className={styles.blurb}>{blurb}</p>
            <a
                href={config.contactLink}
                target="_blank"
                rel="noopener noreferrer"
                className={classNames(commonStyles.focusOutline, styles.button)}
            >
                {t('buttons.download')}
                <ArrowDownTrayIcon className="h-6 w-6" />
            </a>
        </div>
    )
}
