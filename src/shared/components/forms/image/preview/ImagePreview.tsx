import classNames from 'classnames'

import { Image } from '@/shared/components/ui/image/Image'

export interface ImagePreviewProps {
    url: string
}

export const ImagePreview = ({ url }: ImagePreviewProps) => (
    <div
        className={classNames(
            'relative mx-auto mt-5 aspect-video w-full overflow-hidden rounded-xl p-1',
            'border border-neutral-200 dark:border-neutral-700',
            'peer-focus-within:border-black peer-focus-within:dark:border-white'
        )}
    >
        <Image
            alt="Preview"
            className={classNames(
                'h-full w-full object-cover sm:rounded',
                'rounded-xl'
            )}
            src={url}
        />
    </div>
)
