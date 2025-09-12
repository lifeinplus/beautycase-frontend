import { useTranslation } from 'react-i18next'

import { Hero } from '@/shared/components/common/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'
import pageStyles from '@/shared/components/ui/page/page.module.css'
import { OnlineServices } from '@/widgets/online-services/ui/OnlineServices'

export const Pricing = () => {
    const { t } = useTranslation('pricing')

    return (
        <article>
            <Header />
            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero
                        headline={t('hero.headline')}
                        byline={t('hero.byline')}
                    />
                    <OnlineServices />
                </article>
            </main>
        </article>
    )
}
