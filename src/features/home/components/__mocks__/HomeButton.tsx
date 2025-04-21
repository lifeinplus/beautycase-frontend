import { type HomeButtonProps } from '../HomeButton'

export const HomeButton = ({ to, label }: HomeButtonProps) => (
    <a data-testid="mocked-home-button" href={to}>
        {label}
    </a>
)
