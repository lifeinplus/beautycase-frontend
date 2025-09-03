import { CheckIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import commonStyles from '@/shared/components/common/common.module.css'
import styles from './OnlineServiceCard.module.css'

interface OnlineServiceCardProps {
    name: string
    priceEur: number
    time: string
    features: string[]
    popular?: boolean
}

export const OnlineServiceCard = ({
    name,
    priceEur,
    time,
    features,
    popular,
}: OnlineServiceCardProps) => {
    const { t } = useTranslation('pricing')

    return (
        <div
            className={classNames(
                popular ? styles.containerPopular : styles.container
            )}
        >
            <h3
                className={classNames(
                    popular ? styles.namePopular : styles.name
                )}
            >
                {name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
                <span className={styles.price}>{`€${priceEur}`}</span>
                <span className={styles.time}>{`/ ${time}`}</span>
            </p>
            <ul role="list" className={styles.features}>
                {features.map((f) => (
                    <li key={f} className="flex gap-x-3">
                        <CheckIcon aria-hidden="true" className={styles.icon} />
                        {f}
                    </li>
                ))}
            </ul>
            <a
                href="https://t.me/InnaZakharova"
                target="_blank"
                rel="noopener noreferrer"
                className={classNames(
                    commonStyles.focusOutline,
                    popular ? styles.buttonPopular : styles.button
                )}
            >
                {t('button')}
            </a>
        </div>
    )
}
