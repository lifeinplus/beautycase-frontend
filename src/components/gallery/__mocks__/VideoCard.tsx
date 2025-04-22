import { type VideoCardProps } from '../VideoCard'

export const VideoCard = ({ data, path }: VideoCardProps) => (
    <div data-testid={`mocked-video-card-${data._id}`}>
        <h2>{data.title}</h2>
        <div>{path}</div>
    </div>
)
