import { Link } from 'react-router-dom'

import config from '../../config'

interface Image {
    imageUrl: string
    name: string
}

interface ImageCardProps {
    data: Image
    path: string
}

export const ImageCard = ({ data, path }: ImageCardProps) => (
    <div className="img-container img-container-square">
        <Link className="relative overflow-hidden" to={path}>
            <img
                alt={data.name}
                className="img"
                onError={(e) => {
                    e.currentTarget.alt = 'Default Image'
                    e.currentTarget.src = config.cloudinary.defaultThumbnailUrl
                }}
                src={data.imageUrl}
            />
        </Link>
    </div>
)
