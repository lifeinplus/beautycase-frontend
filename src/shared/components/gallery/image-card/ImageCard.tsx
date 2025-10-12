import { Link } from 'react-router-dom'

import { Image } from '../../ui/image/Image'

export interface ImageCardProps {
    data: {
        _id?: string
        imageUrl: string
        name: string
    }
    to: string
}

export const ImageCard = ({ data, to }: ImageCardProps) => (
    <div className="relative mx-auto aspect-square w-full overflow-hidden">
        <Link className="relative overflow-hidden" to={to}>
            <Image alt={data.name} src={data.imageUrl} />
        </Link>
    </div>
)
