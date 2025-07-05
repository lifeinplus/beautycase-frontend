import { Image } from '../ui/Image'

export interface HeroProps {
    headline?: string
    byline?: string
    imgUrl?: string
    content?: string
}

export const Hero = ({ headline, byline, imgUrl, content }: HeroProps) => (
    <section id="hero" className="hero">
        <div className="hero-title">
            {headline && <h2 className="hero-headline">{headline}</h2>}
            {byline && <h3 className="hero-byline">{byline}</h3>}
        </div>

        {imgUrl && <Image alt={headline} className="hero-img" src={imgUrl} />}

        {content && <p className="hero-content">{content}</p>}
    </section>
)
