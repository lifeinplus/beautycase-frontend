import { AdaptiveNavBar, Header, Hero } from '../../../components'

export const ConfirmationPage = () => {
    return (
        <article>
            <Header />

            <main className="page-content">
                <article className="content-container">
                    <Hero
                        headline="Спасибо!"
                        byline="Ваша анкета успешно отправлена"
                    />
                </article>
            </main>

            <AdaptiveNavBar />
        </article>
    )
}
