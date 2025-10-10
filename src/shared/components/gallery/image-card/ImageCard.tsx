import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { Image } from '../../ui/image/Image'

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
    <div
        className={classNames(
            'relative mx-auto w-full overflow-hidden',
            'aspect-square'
        )}
    >
        <Link className="relative overflow-hidden" to={path}>
            <Image alt={data.name} src={data.imageUrl} />
        </Link>
    </div>
)
