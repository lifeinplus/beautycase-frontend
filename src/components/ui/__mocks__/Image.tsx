import { type ImageProps } from '../Image'

export const Image = ({ src, alt, className }: ImageProps) => (
    <img src={src} alt={alt} className={className} data-testid="mocked-image" />
)
