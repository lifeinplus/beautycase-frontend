import { AdvancedImage } from '@cloudinary/react'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import config from '@/app/config/config'
import cloudinary from '@/shared/lib/cloudinary/cloudinary'

export interface ImageCardProps {
    data: {
        _id?: string
        imageIds?: string[]
        name: string
    }
    to: string
}

export const ImageCard = ({ data, to }: ImageCardProps) => {
    const [error, setError] = useState(false)

    const publicId =
        !error && data?.imageIds?.[0]
            ? data.imageIds[0]
            : config.cloudinary.defaultThumbnailName

    const cldImg = cloudinary
        .image(publicId)
        .resize(scale().width(400))
        .format('auto')
        .quality('auto')

    return (
        <div className="relative mx-auto aspect-square w-full overflow-hidden ring-1 ring-neutral-100 md:rounded dark:ring-neutral-900">
            <Link className="relative overflow-hidden" to={to}>
                <AdvancedImage
                    cldImg={cldImg}
                    className="h-full w-full object-cover"
                    onError={() => {
                        setError(true)
                    }}
                />
            </Link>
        </div>
    )
}
