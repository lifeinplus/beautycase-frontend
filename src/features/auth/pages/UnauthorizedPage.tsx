import { AdaptiveNavBar } from '../../../components/navigation/AdaptiveNavBar'
import { Header } from '../../../components/Header'
import { Hero } from '../../../components/Hero'

export const UnauthorizedPage = () => {
    return (
        <article>
            <Header />

            <main className="page-content">
                <article className="content-container">
                    <Hero
                        headline="Доступ запрещен"
                        byline="У вас нет разрешения на просмотр этой страницы"
                    />
                </article>
            </main>

            <AdaptiveNavBar />
        </article>
    )
}
