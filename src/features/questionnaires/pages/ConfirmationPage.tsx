import { Header } from '../../../components/Header'
import { Hero } from '../../../components/Hero'
import { AdaptiveNavBar } from '../../../components/navigation/AdaptiveNavBar'

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
