import { useTranslation } from 'react-i18next'

import { AdaptiveNavBar } from '../../../components/navigation/AdaptiveNavBar'
import { Header } from '../../../components/Header'
import { Hero } from '../../../components/Hero'

export const UnauthorizedPage = () => {
    const { t } = useTranslation('unauthorized')

    return (
        <article>
            <Header />

            <main className="page-content">
                <article className="content-container">
                    <Hero
                        headline={t('hero.headline')}
                        byline={t('hero.byline')}
                    />
                </article>
            </main>

            <AdaptiveNavBar />
        </article>
    )
}
