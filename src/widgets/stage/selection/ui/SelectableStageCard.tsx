import classNames from 'classnames'

import { CloudinaryImage } from '@/shared/components/image/CloudinaryImage'

interface SelectableStageCardProps {
    id: string
    title: string
    subtitle: string
    imageId: string
    order?: number
    isSelected: boolean
    onToggle: (id: string) => void
}

export const SelectableStageCard = ({
    id,
    title,
    subtitle,
    imageId,
    order,
    isSelected,
    onToggle,
}: SelectableStageCardProps) => (
    <div className="grid grid-cols-3 gap-3" onClick={() => onToggle(id)}>
        <div className="relative mx-auto aspect-square w-full overflow-hidden md:rounded">
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

        <div className="col-span-2">
            <h2>{title}</h2>
            <h3 className="text-sm text-neutral-500 dark:text-neutral-400">
                {subtitle}
            </h3>
        </div>
    </div>
)
