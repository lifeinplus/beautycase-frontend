import { type HeroProps } from '../Hero'

export const Hero = ({ headline, byline, imgUrl }: HeroProps) => (
    <div data-testid="mocked-hero">
        <h2 data-testid="mocked-headline">{headline}</h2>
        <h3 data-testid="mocked-byline">{byline}</h3>
        <img data-testid="mocked-image" src={imgUrl} alt="image" />
    </div>
)
