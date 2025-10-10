import { Link } from 'react-router-dom'

import { getThumbnail } from '@/shared/utils/youtube/getThumbnail'
import { Image } from '../../ui/image/Image'

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
    <Link
        to={path}
        className="relative overflow-hidden border-t border-neutral-200 dark:border-neutral-800"
    >
        <div className="relative mx-auto aspect-video w-full overflow-hidden">
            <Image
                alt={`${data.title} Thumbnail`}
                src={getThumbnail(data.videoUrl)}
            />
        </div>

        <div className="mx-3 mt-2">
            <h3 className="text-sm">{data.title}</h3>
            <p className="text-xs text-gray-400">{data.shortDescription}</p>
        </div>
    </Link>
)
