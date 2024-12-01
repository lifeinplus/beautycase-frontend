const Hero = () => (
    <section id="hero" className="flex flex-col items-center justify-center">
        <article className="mx-auto mb-9 mt-6 w-11/12">
            <h2 className="mx-auto text-center font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
                Косметичка
            </h2>
            <h3 className="mx-auto mt-3 text-center font-heading text-xl text-slate-700 dark:text-slate-400 sm:text-2xl">
                Индивидуальный подбор продуктов
            </h3>
        </article>
        <img
            src="https://res.cloudinary.com/dtx4nqyeb/image/upload/v1732162378/title_gm1yla.png"
            alt="Косметичка"
            className="sm:rounded"
        />
    </section>
)

export default Hero
