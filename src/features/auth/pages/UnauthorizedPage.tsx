import { useTranslation } from 'react-i18next'

import { NavBar } from '../../../components/navigation/NavBar'
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

            <NavBar />
        </article>
    )
}
