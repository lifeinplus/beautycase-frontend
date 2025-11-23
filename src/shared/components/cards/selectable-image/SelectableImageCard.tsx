import classNames from 'classnames'

import { CloudinaryImage } from '../../image/CloudinaryImage'

interface SelectableImageCardProps {
    id: string
    imageId: string
    order?: number
    isSelected: boolean
    onToggle: (id: string) => void
}

export const SelectableImageCard = ({
    id,
    imageId,
    order,
    isSelected,
    onToggle,
}: SelectableImageCardProps) => (
    <div
        className="relative mx-auto aspect-square w-full overflow-hidden md:rounded"
        onClick={() => onToggle(id)}
    >
        <CloudinaryImage
            imageId={imageId}
            width={400}
            className="h-full w-full object-cover"
        />

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
