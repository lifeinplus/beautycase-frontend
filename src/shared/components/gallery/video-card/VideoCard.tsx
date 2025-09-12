import { Link } from 'react-router-dom'

import { getThumbnail } from '@/shared/utils/youtube/getThumbnail'
import { Image } from '../../ui/image/Image'
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
                src={getThumbnail(data.videoUrl)}
            />
        </div>

        <div className={styles.metadata}>
            <h3 className={styles.headline}>{data.title}</h3>
            <p className={styles.byline}>{data.shortDescription}</p>
        </div>
    </Link>
)
