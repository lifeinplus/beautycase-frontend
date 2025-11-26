import config from '@/app/config/config'

export interface ImageProps {
    alt?: string
    className?: string
    src?: string
}

export const Image = ({
    alt,
    className = 'h-full w-full object-cover md:rounded',
    src,
}: ImageProps) => (
    <img
        alt={alt}
        className={className}
        onError={(e) => {
            e.currentTarget.alt = 'Default Image'
            e.currentTarget.src = config.cloudinary.defaultProductUrl
        }}
        src={src}
    />
)
