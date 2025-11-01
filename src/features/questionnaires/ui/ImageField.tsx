import { AdvancedImage } from '@cloudinary/react'
import { scale } from '@cloudinary/url-gen/actions/resize'

import config from '@/app/config/config'
import cloudinary from '@/shared/lib/cloudinary/cloudinary'

interface ImageFieldProps {
    value?: string
}

export const ImageField = ({ value }: ImageFieldProps) => {
    const publicID = value || config.cloudinary.defaultThumbnailName

    const cldImg = cloudinary
        .image(publicID)
        .resize(scale().width(800))
        .format('auto')
        .quality('auto')

    return <AdvancedImage cldImg={cldImg} />
}
