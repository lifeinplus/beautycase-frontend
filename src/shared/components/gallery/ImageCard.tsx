import classNames from 'classnames'
import { Link } from 'react-router-dom'

import imageStyles from '@/shared/components/ui/image.module.css'
import { Image } from '../ui/Image'

interface ImageData {
    _id?: string
    imageUrl: string
    name: string
}

export interface ImageCardProps {
    data: ImageData
    path: string
}

export const ImageCard = ({ data, path }: ImageCardProps) => (
    <div className={classNames(imageStyles.container, imageStyles.square)}>
        <Link className="relative overflow-hidden" to={path}>
            <Image alt={data.name} src={data.imageUrl} />
        </Link>
    </div>
)
