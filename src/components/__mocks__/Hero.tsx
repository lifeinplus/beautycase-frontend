import { type HeroProps } from '../Hero'

export const Hero = ({ headline }: HeroProps) => (
    <div data-testid="mocked-hero">{headline}</div>
)
