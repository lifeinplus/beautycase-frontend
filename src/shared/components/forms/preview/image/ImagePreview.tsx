import { MinusCircleIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'

import { CloudinaryImage } from '@/shared/components/image/CloudinaryImage'

export interface ImagePreviewProps {
    className?: string
    imageId: string
    isLoading?: boolean
    onDelete: () => void
}

export const ImagePreview = ({
    className,
    imageId,
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
                    'h-14 w-14 stroke-[0.5] text-white',
                    isLoading
                        ? 'animate-spin opacity-50'
                        : 'animate-none hover:opacity-80'
                )}
            />
        </button>

        <CloudinaryImage
            imageId={imageId}
            width={800}
            className="h-full w-full object-cover"
        />
    </div>
)
