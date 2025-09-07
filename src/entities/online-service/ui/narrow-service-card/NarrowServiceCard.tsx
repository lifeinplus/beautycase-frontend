import { CheckIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import config from '@/app/config'
import commonStyles from '@/shared/components/common/common.module.css'
import styles from './NarrowServiceCard.module.css'

interface NarrowServiceCardProps {
    name: string
    blurb: string
    priceEur: number
    oldPriceEur?: number
    time: string
    features: string[]
    popular?: boolean
}

export const NarrowServiceCard = ({
    name,
    blurb,
    priceEur,
    oldPriceEur,
    time,
    features,
    popular,
}: NarrowServiceCardProps) => {
    const { t } = useTranslation('pricing')

    return (
        <div
            className={classNames(
                popular ? styles.containerPopular : styles.container
            )}
        >
            <h4
                className={classNames(
                    popular ? styles.namePopular : styles.name
                )}
            >
                {name}
            </h4>

            <p className="mt-4 flex items-baseline gap-x-2">
                {oldPriceEur && (
                    <span className={styles.oldPrice}>{`€${oldPriceEur}`}</span>
                )}
                <span className={styles.price}>{`€${priceEur}`}</span>
                <span className={styles.time}>{`/ ${time}`}</span>
            </p>

            <p className={styles.blurb}>{blurb}</p>

            <ul role="list" className={styles.features}>
                {features.map((f) => (
                    <li key={f} className="flex gap-x-3">
                        <CheckIcon aria-hidden="true" className={styles.icon} />
                        {f}
                    </li>
                ))}
            </ul>

            <a
                href={config.contactLink}
                target="_blank"
                rel="noopener noreferrer"
                className={classNames(
                    commonStyles.focusOutline,
                    popular ? styles.buttonPopular : styles.button
                )}
            >
                {t('buttons.book')}
            </a>
        </div>
    )
}
