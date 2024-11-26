const Hero = ({
    title,
    subtitle,
    image,
}: {
    title: string
    subtitle: string
    image: string
}) => (
    <section id="hero" className="flex flex-col items-center justify-center">
        <article className="mx-auto mb-9 mt-6 w-11/12">
            <h2 className="mx-auto text-center font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
                {title}
            </h2>
            <h3 className="mx-auto mt-3 text-center font-heading text-xl text-slate-700 sm:text-2xl dark:text-slate-400">
                {subtitle}
            </h3>
        </article>
        <img src={image} alt={title} className="sm:rounded" />
    </section>
)

export default Hero
