interface HeroProps {
    headline: string
    byline?: string
    imgUrl?: string
    content?: string
}

export const Hero = ({ headline, byline, imgUrl, content }: HeroProps) => (
    <section
        id="hero"
        className="mb-6 flex flex-col items-center justify-center pt-6 sm:pt-0"
    >
        <div className="page-title">
            <h1 className="page-headline">{headline}</h1>
            {byline && <h2 className="page-byline">{byline}</h2>}
        </div>

        {imgUrl && (
            <img alt={headline} className="mt-6 sm:rounded" src={imgUrl} />
        )}

        {content && <p className="me-3 ms-3 mt-6">{content}</p>}
    </section>
)
