import { Image } from '../components'

interface HeroProps {
    headline?: string
    byline?: string
    imgUrl?: string
    content?: string
}

export const Hero = ({ headline, byline, imgUrl, content }: HeroProps) => (
    <section id="hero" className="hero">
        <div className="hero-title">
            {headline && <h1 className="hero-headline">{headline}</h1>}
            {byline && <h2 className="hero-byline">{byline}</h2>}
        </div>

        {imgUrl && <Image alt={headline} className="hero-img" src={imgUrl} />}

        {content && <p className="hero-content">{content}</p>}
    </section>
)
