import { Link } from 'react-router-dom'

import { Image } from '../../components/ui/Image'
import { getYouTubeThumbnail } from '@/shared/utils/youtube'
import styles from './VideoCard.module.css'

interface VideoData {
    _id?: string
    shortDescription: string
    title: string
    videoUrl: string
}

export interface VideoCardProps {
    data: VideoData
    path: string
}

export const VideoCard = ({ data, path }: VideoCardProps) => (
    <Link to={path} className={styles.card}>
        <div className={styles.thumbnail}>
            <Image
                alt={`${data.title} Thumbnail`}
                src={getYouTubeThumbnail(data.videoUrl)}
            />
        </div>

        <div className={styles.metadata}>
            <h3 className={styles.headline}>{data.title}</h3>
            <p className={styles.byline}>{data.shortDescription}</p>
        </div>
    </Link>
)
