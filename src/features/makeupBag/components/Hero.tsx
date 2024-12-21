import { PageTitle } from '../../../components'

export const Hero = () => (
    <section id="hero" className="flex flex-col items-center justify-center">
        <PageTitle
            headline="Косметичка"
            byline="Индивидуальный подбор продуктов"
        />

        <img
            alt="Косметичка"
            className="sm:rounded"
            src="https://res.cloudinary.com/dtx4nqyeb/image/upload/v1732162378/title_gm1yla.png"
        />
    </section>
)
