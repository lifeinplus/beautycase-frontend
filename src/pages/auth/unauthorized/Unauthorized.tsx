import { useTranslation } from 'react-i18next'

import { Hero } from '@/shared/components/common/Hero'
import { Header } from '@/shared/components/layout/Header'
import pageStyles from '@/shared/components/ui/page.module.css'

export const Unauthorized = () => {
    const { t } = useTranslation('unauthorized')

    return (
        <article>
            <Header />
            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero
                        headline={t('hero.headline')}
                        byline={t('hero.byline')}
                    />
                </article>
            </main>
        </article>
    )
}
