import { Link, useLocation } from 'react-router-dom'

import config from '@/app/config/config'
import { CloudinaryImage } from '../../image/CloudinaryImage'

export interface ImageCardProps {
    imageId: string
    defaultImageId?: string
    to: string
}

export const ImageCard = ({
    imageId,
    defaultImageId = config.cloudinary.defaultProductId,
    to,
}: ImageCardProps) => {
    const { pathname, state } = useLocation()

    return (
        <div className="relative mx-auto aspect-square w-full overflow-hidden ring-1 ring-neutral-100 md:rounded dark:ring-neutral-900">
            <Link
                className="relative overflow-hidden"
                to={to}
                state={{
                    origin: state?.origin || pathname,
                    prev: pathname,
                }}
            >
                <CloudinaryImage
                    className="h-full w-full object-cover"
                    imageId={imageId}
                    defaultImageId={defaultImageId}
                    width={400}
                />
            </Link>
        </div>
    )
}
