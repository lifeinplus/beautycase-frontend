import { useTranslation } from 'react-i18next'

import { AddonServiceCard } from '@/entities/online-service/ui/addon-service-card/AddonServiceCard'
import { NarrowServiceCard } from '@/entities/online-service/ui/narrow-service-card/NarrowServiceCard'
import { WideServiceCard } from '@/entities/online-service/ui/wide-service-card/WideServiceCard'

export const OnlineServices = () => {
    const { t } = useTranslation('pricing')

    const services = [
        { key: 'consultation', priceEur: 25 },
        { key: 'makeupBag', priceEur: 45, oldPriceEur: 65, popular: true },
        { key: 'videoLesson', priceEur: 70 },
        { key: 'premiumPackage', priceEur: 250 },
    ]

    const workshops = [
        { key: 'workshopMakeup', priceEur: 15, oldPriceEur: 25 },
        { key: 'workshopHairStyle', priceEur: 15, oldPriceEur: 25 },
    ]

    const addons = [{ key: 'budgetCosmetics' }, { key: 'basicBrushes' }]

    return (
        <div className="space-y-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 items-stretch gap-7 px-7 sm:px-0 md:grid-cols-2">
                {services.map((s) => (
                    <NarrowServiceCard
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

            <p className="font-heading mx-auto w-11/12 pt-4 text-center text-2xl font-bold md:text-3xl lg:text-4xl">
                {t('workshops.title')}
            </p>
            <div className="mx-auto grid max-w-2xl items-stretch gap-7 px-7 sm:px-0">
                {workshops.map((w) => (
                    <WideServiceCard
                        key={w.key}
                        name={t(`workshops.${w.key}.name`)}
                        blurb={t(`workshops.${w.key}.blurb`)}
                        priceEur={w.priceEur}
                        oldPriceEur={w.oldPriceEur}
                        features={
                            t(`workshops.${w.key}.features`, {
                                returnObjects: true,
                            }) as string[]
                        }
                    />
                ))}
            </div>

            <p className="font-heading mx-auto w-11/12 pt-4 text-center text-2xl font-bold md:text-3xl lg:text-4xl">
                {t('addons.title')}
            </p>
            <div className="mx-auto grid max-w-2xl grid-cols-1 items-stretch gap-7 px-7 sm:grid-cols-2 sm:px-0">
                {addons.map((a) => (
                    <AddonServiceCard
                        key={a.key}
                        name={t(`addons.${a.key}.name`)}
                        blurb={t(`addons.${a.key}.blurb`)}
                    />
                ))}
            </div>
        </div>
    )
}
