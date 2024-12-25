import { AdaptiveNavBar, Header, Hero } from '../../../components'

export const ConfirmationPage = () => {
    return (
        <article>
            <Header />

            <main className="page-content flex flex-col items-center justify-center">
                <section className="w-full max-w-2xl">
                    <Hero
                        headline="Спасибо!"
                        byline="Ваша анкета успешно отправлена"
                    />
                </section>
            </main>

            <AdaptiveNavBar />
        </article>
    )
}
