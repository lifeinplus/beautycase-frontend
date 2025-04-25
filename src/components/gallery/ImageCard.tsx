import { Link } from 'react-router-dom'

import { Image } from '../ui/Image'

interface ImageData {
    imageUrl: string
    name: string
}

export interface ImageCardProps {
    data: ImageData
    path: string
}

export const ImageCard = ({ data, path }: ImageCardProps) => (
    <div className="img-container img-container-square">
        <Link className="relative overflow-hidden" to={path}>
            <Image alt={data.name} src={data.imageUrl} />
        </Link>
    </div>
)
