import { type HomeTileProps } from '../HomeButton'

export const HomeButton = ({ to, label }: HomeTileProps) => (
    <a data-testid="mocked-home-tile" href={to}>
        {label}
    </a>
)
