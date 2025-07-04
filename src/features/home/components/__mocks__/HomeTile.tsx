import { type HomeTileProps } from '../HomeTile'

export const HomeTile = ({ to, label }: HomeTileProps) => (
    <a data-testid="mocked-home-tile" href={to}>
        {label}
    </a>
)
