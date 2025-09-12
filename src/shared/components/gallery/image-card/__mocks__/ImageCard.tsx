import { type ImageCardProps } from '../ImageCard'

export const ImageCard = ({ data, path }: ImageCardProps) => (
    <div data-testid={`mocked-image-card-${data._id}`}>
        <h2>{data.name}</h2>
        <div>{path}</div>
    </div>
)
