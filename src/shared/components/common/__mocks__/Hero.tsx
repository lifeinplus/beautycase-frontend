import { type HeroProps } from '../Hero'

export const Hero = ({ headline, byline }: HeroProps) => (
    <div data-testid="mocked-hero">
        <h2 data-testid="mocked-headline">{headline}</h2>
        <h3 data-testid="mocked-byline">{byline}</h3>
    </div>
)
