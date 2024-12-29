import { AdaptiveNavBar, Header, Hero } from '../../../components'

export const ConfirmationPage = () => {
    return (
        <article>
            <Header />

            <main className="page-content">
                <section className="w-full max-w-2xl">
                    <article className="page-content__container">
                        <Hero
                            headline="Спасибо!"
                            byline="Ваша анкета успешно отправлена"
                        />
                    </article>
                </section>
            </main>

            <AdaptiveNavBar />
        </article>
    )
}
