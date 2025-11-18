import { AdvancedImage } from '@cloudinary/react'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { MinusCircleIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useState } from 'react'

import config from '@/app/config/config'
import cloudinary from '@/shared/lib/cloudinary/cloudinary'

export interface ImagePreviewProps {
    imageId: string
    onDelete: () => void
    isLoading?: boolean
}

export const ImagePreview = ({
    imageId,
    onDelete,
    isLoading,
}: ImagePreviewProps) => {
    const [error, setError] = useState(false)

    const publicId =
        !error && imageId ? imageId : config.cloudinary.defaultThumbnailName

    const cldImg = cloudinary
        .image(publicId)
        .resize(scale().width(800))
        .format('auto')
        .quality('auto')

    return (
        <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700">
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
            <AdvancedImage
                cldImg={cldImg}
                onError={() => {
                    setError(true)
                }}
            />
        </div>
    )
}
