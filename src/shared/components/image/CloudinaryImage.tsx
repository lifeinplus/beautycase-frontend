import { AdvancedImage } from '@cloudinary/react'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { useMemo, useState } from 'react'

import config from '@/app/config/config'
import cloudinary from '@/shared/lib/cloudinary/cloudinary'

interface CloudinaryImageProps {
    imageId?: string
    width?: number
    className?: string
}

export const CloudinaryImage = ({
    imageId,
    width = 400,
    className,
}: CloudinaryImageProps) => {
    const [error, setError] = useState(false)

    const publicId: string =
        error || !imageId ? config.cloudinary.defaultThumbnailName : imageId

    const cldImg = useMemo(() => {
        return cloudinary
            .image(publicId)
            .resize(scale().width(width))
            .format('auto')
            .quality('auto')
    }, [publicId, width])

    return (
        <AdvancedImage
            cldImg={cldImg}
            className={className}
            onError={() => {
                setError(true)
            }}
        />
    )
}
