import { CheckIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import config from '@/app/config'
import commonStyles from '@/shared/components/common/common.module.css'
import styles from './WideServiceCard.module.css'

interface WideServiceCardProps {
    name: string
    blurb: string
    priceEur: number
    oldPriceEur?: number
    features: string[]
}

export const WideServiceCard = ({
    name,
    blurb,
    priceEur,
    oldPriceEur,
    features,
}: WideServiceCardProps) => {
    const { t } = useTranslation('pricing')

    return (
        <div className={styles.container}>
            <div className="p-4 pb-8 sm:p-8">
                <h4 className={styles.name}>{name}</h4>
                <p className={styles.blurb}>{blurb}</p>
                <div className="mt-10 flex items-center gap-4">
                    <h4 className={styles.included}>{t('included')}</h4>
                    <div className={styles.includedLine}></div>
                </div>
                <ul role="list" className={styles.features}>
                    {features.map((f) => (
                        <li key={f} className="flex gap-x-3">
                            <CheckIcon
                                aria-hidden="true"
                                className={styles.icon}
                            />
                            {f}
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.pay}>
                <div className="mx-auto max-w-80 px-8">
                    <p className={styles.priceContainer}>
                        {oldPriceEur && (
                            <span
                                className={styles.oldPrice}
                            >{`€${oldPriceEur}`}</span>
                        )}
                        <span className={styles.price}>{`€${priceEur}`}</span>
                    </p>
                    <a
                        href={config.contactLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classNames(
                            commonStyles.focusOutline,
                            styles.button
                        )}
                    >
                        {t('buttons.get')}
                    </a>
                </div>
            </div>
        </div>
    )
}
