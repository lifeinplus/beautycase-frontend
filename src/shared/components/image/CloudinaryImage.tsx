import { AdvancedImage } from '@cloudinary/react'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { useMemo, useState } from 'react'

import config from '@/app/config/config'
import cloudinary from '@/shared/lib/cloudinary/cloudinary'

interface CloudinaryImageProps {
    className?: string
    imageId?: string
    defaultImageId?: string
    width?: number
}

export const CloudinaryImage = ({
    className,
    imageId,
    defaultImageId = config.cloudinary.defaultProductId,
    width = 400,
}: CloudinaryImageProps) => {
    const [error, setError] = useState(false)

    const publicId: string = imageId && !error ? imageId : defaultImageId

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
