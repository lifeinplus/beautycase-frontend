import config from '@/app/config'
import imageStyles from '@/shared/components/ui/image.module.css'

export interface ImageProps {
    alt?: string
    className?: string
    src?: string
}

export const Image = ({
    alt,
    className = imageStyles.img,
    src,
}: ImageProps) => {
    return (
        <img
            alt={alt}
            className={className}
            onError={(e) => {
                e.currentTarget.alt = 'Default Image'
                e.currentTarget.src = config.cloudinary.defaultThumbnailUrl
            }}
            src={src}
        />
    )
}
