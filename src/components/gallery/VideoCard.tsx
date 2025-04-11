import { Link } from 'react-router-dom'
import { Image } from '../../components/ui/Image'
import { getYouTubeThumbnail } from '../../utils/youtube'

interface Video {
    shortDescription: string
    title: string
    videoUrl: string
}

interface VideoCardProps {
    data: Video
    path: string
}

export const VideoCard = ({ data, path }: VideoCardProps) => (
    <Link to={path} className="lesson-card">
        <div className="lesson-card-thumbnail-container">
            <Image
                alt={`${data.title} Thumbnail`}
                src={getYouTubeThumbnail(data.videoUrl)}
            />
        </div>

        <div className="lesson-card-metadata">
            <h3 className="lesson-card-headline">{data.title}</h3>
            <p className="lesson-card-byline">{data.shortDescription}</p>
        </div>
    </Link>
)
