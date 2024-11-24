const Hero = ({
    title,
    subtitle,
    image,
}: {
    title: string
    subtitle: string
    image: string
}) => (
    <section
        id="hero"
        className="flex scroll-mt-20 flex-col-reverse items-center justify-center gap-8 p-5 lg:flex-row"
    >
        <article className="my-9 lg:w-1/2">
            <h2 className="lg:text-5sl max-w-md text-center font-heading text-3xl font-bold text-slate-900 lg:text-left dark:text-white">
                {title}
            </h2>
            <h3 className="mt-4 max-w-md text-center font-heading text-xl text-slate-700 lg:text-left dark:text-slate-400">
                {subtitle}
            </h3>
        </article>
        <img src={image} alt={title} className="rounded-md" />
    </section>
)

export default Hero
