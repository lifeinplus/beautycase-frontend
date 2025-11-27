import { MinusCircleIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'

import config from '@/app/config/config'
import { CloudinaryImage } from '@/shared/components/image/CloudinaryImage'

export interface ImagePreviewProps {
    className?: string
    imageId: string
    defaultImageId?: string
    isLoading?: boolean
    onDelete: () => void
}

export const ImagePreview = ({
    className,
    imageId,
    defaultImageId = config.cloudinary.defaultProductId,
    isLoading,
    onDelete,
}: ImagePreviewProps) => (
    <div
        className={classNames(
            'relative mx-auto aspect-video w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700',
            className
        )}
    >
        <button
            aria-label="Delete image"
            className={classNames(
                'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2',
                'focus-visible:rounded-full focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed dark:focus-visible:outline-rose-700',
                isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
            )}
            disabled={isLoading}
            onClick={onDelete}
            type="button"
        >
            <MinusCircleIcon
                className={classNames(
                    'size-14 stroke-[0.5] text-white',
                    isLoading
                        ? 'animate-spin opacity-50'
                        : 'animate-none hover:opacity-80'
                )}
            />
        </button>

        <CloudinaryImage
            className="h-full w-full object-cover"
            imageId={imageId}
            defaultImageId={defaultImageId}
            width={800}
        />
    </div>
)
