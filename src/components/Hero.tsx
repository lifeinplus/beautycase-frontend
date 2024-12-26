import { PageTitle } from '.'

interface HeroProps {
    headline: string
    byline?: string
    imgUrl?: string
    content?: string
}

export const Hero = ({ headline, byline, imgUrl, content }: HeroProps) => (
    <section id="hero" className="flex flex-col items-center justify-center">
        <PageTitle headline={headline} byline={byline} />

        {imgUrl && (
            <img alt={headline} className="mt-9 sm:rounded" src={imgUrl} />
        )}

        {content && <p className="mb-2 me-3 ms-3 mt-6">{content}</p>}
    </section>
)
