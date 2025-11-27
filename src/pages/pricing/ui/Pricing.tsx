import { useTranslation } from 'react-i18next'

import { Hero } from '@/shared/components/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'
import { OnlineServices } from '@/widgets/online-services/OnlineServices'

export const Pricing = () => {
    const { t } = useTranslation('pricing')

    return (
        <article>
            <Header />
            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-wide flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 md:max-w-2xl md:px-4 md:pt-6">
                    <Hero
                        title={t('hero.headline')}
                        subtitle={t('hero.byline')}
                    />
                    <OnlineServices />
                </article>
            </main>
        </article>
    )
}
