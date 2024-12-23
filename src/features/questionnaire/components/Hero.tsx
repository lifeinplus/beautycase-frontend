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
            src="https://lh5.googleusercontent.com/Y7GG-A49X76b3UcI62qQbq1tBhjWr38IvtUwEdBx-GsfAIR-E_cuSzh0nGuZ1WvVVBU_Odf6tBx2LxaFurZdYl8fn_V-41LkTa7Wn0DlhHP8-xx2P21loFlvCqQdLmLj3g80Ia_VjCw=w2494"
        />
        <p className="mb-2 me-3 ms-4 mt-6">
            Привет! Спасибо за выбор моей услуги. Для того, чтобы я могла
            максимально точно подобрать то, что нужно именно вам, прошу ответить
            на некоторые вопросы.
        </p>
    </section>
)
