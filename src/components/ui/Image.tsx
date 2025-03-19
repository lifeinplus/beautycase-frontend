import config from '../../config'

export interface ImageProps {
    alt?: string
    className?: string
    src?: string
}

export const Image = ({ alt, className = 'img', src }: ImageProps) => {
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
