import { useTranslation } from 'react-i18next'

import { OnlineServiceCard } from '@/entities/online-service/ui/OnlineServiceCard'
import styles from './OnlineServices.module.css'

export const OnlineServices = () => {
    const { t } = useTranslation('pricing')

    const services = [
        { key: 'miniConsultation', priceEur: 25 },
        { key: 'makeupBag', priceEur: 45, oldPriceEur: 65, popular: true },
        { key: 'videoLesson', priceEur: 70 },
        { key: 'premiumPackage', priceEur: 250 },
    ]

    return (
        <div className={styles.container}>
            {services.map((s) => (
                <OnlineServiceCard
                    key={s.key}
                    name={t(`services.${s.key}.name`)}
                    blurb={t(`services.${s.key}.blurb`)}
                    priceEur={s.priceEur}
                    oldPriceEur={s.oldPriceEur}
                    time={t(`services.${s.key}.time`)}
                    features={
                        t(`services.${s.key}.features`, {
                            returnObjects: true,
                        }) as string[]
                    }
                    popular={s.popular}
                />
            ))}
        </div>
    )
}
