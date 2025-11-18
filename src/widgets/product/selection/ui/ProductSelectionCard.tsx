import config from '@/app/config/config'
import cloudinary from '@/shared/lib/cloudinary/cloudinary'
import { AdvancedImage } from '@cloudinary/react'
import { scale } from '@cloudinary/url-gen/actions/resize'
import classNames from 'classnames'
import { useState } from 'react'

interface ProductSelectionCardProps {
    id: string
    imageIds: string[]
    order?: number
    isSelected: boolean
    onToggle: (id: string) => void
}

export const ProductSelectionCard = ({
    id,
    imageIds,
    order,
    isSelected,
    onToggle,
}: ProductSelectionCardProps) => {
    const [error, setError] = useState(false)

    const publicId =
        !error && imageIds[0]
            ? imageIds[0]
            : config.cloudinary.defaultThumbnailName

    const cldImg = cloudinary
        .image(publicId)
        .resize(scale().width(400))
        .format('auto')
        .quality('auto')

    return (
        <div
            className="relative mx-auto aspect-square w-full overflow-hidden md:rounded"
            onClick={() => onToggle(id)}
        >
            <AdvancedImage cldImg={cldImg} onError={() => setError(true)} />

            <span
                className={classNames(
                    'absolute top-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-sm font-bold shadow-lg',
                    isSelected
                        ? 'bg-rose-500 text-white'
                        : 'bg-transparent text-gray-400'
                )}
            >
                {order ?? ''}
            </span>
        </div>
    )
}
