import { PageTitle } from '../../../components'

export const Hero = () => (
    <section id="hero" className="flex flex-col items-center justify-center">
        <PageTitle
            headline="Анкета"
            byline="Индивидуальный подбор косметички"
        />

        <img
            alt="Анкета"
            className="sm:rounded"
            src="https://res.cloudinary.com/dtx4nqyeb/image/upload/v1734995126/Questionnaire_cqv0mc.jpg"
        />
        <p className="mb-2 me-3 ms-4 mt-6">
            Привет! Спасибо за выбор моей услуги. Для того, чтобы я могла
            максимально точно подобрать то, что нужно именно вам, прошу ответить
            на некоторые вопросы.
        </p>
    </section>
)
