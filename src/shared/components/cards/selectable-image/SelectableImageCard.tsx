import classNames from 'classnames'

import config from '@/app/config/config'
import { CloudinaryImage } from '../../image/CloudinaryImage'

interface SelectableImageCardProps {
    id: string
    imageId: string
    defaultImageId?: string
    order?: number
    isSelected: boolean
    onToggle: (id: string) => void
}

export const SelectableImageCard = ({
    id,
    imageId,
    defaultImageId = config.cloudinary.defaultProductId,
    order,
    isSelected,
    onToggle,
}: SelectableImageCardProps) => (
    <div
        className="relative mx-auto aspect-square w-full overflow-hidden md:rounded"
        onClick={() => onToggle(id)}
    >
        <CloudinaryImage
            className="h-full w-full object-cover"
            imageId={imageId}
            defaultImageId={defaultImageId}
            width={400}
        />

        <span
            className={classNames(
                'absolute top-1 right-1 flex size-8 items-center justify-center rounded-full border-2 border-white text-sm font-bold shadow-lg',
                isSelected
                    ? 'bg-rose-500 text-white'
                    : 'bg-transparent text-gray-400'
            )}
        >
            {order ?? ''}
        </span>
    </div>
)
