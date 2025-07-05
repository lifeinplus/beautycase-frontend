import { useTranslation } from 'react-i18next'

import { Hero } from '../../../shared/components/common/Hero'
import { Header } from '../../../shared/components/layout/Header'
import { NavBar } from '../../../shared/components/navigation/NavBar'

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

            <NavBar />
        </article>
    )
}
