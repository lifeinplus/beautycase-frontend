import { AdaptiveNavBar, Header, Hero } from '../../../components'

export const UnauthorizedPage = () => {
    return (
        <article>
            <Header />

            <main className="page-content">
                <section className="w-full max-w-2xl">
                    <article className="content-container">
                        <Hero
                            headline="Доступ запрещен"
                            byline="У вас нет разрешения на просмотр этой страницы"
                        />
                    </article>
                </section>
            </main>

            <AdaptiveNavBar />
        </article>
    )
}
