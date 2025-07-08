import classNames from 'classnames'

import { Image } from '@/shared/components/ui/Image'
import inputStyles from '@/shared/components/ui/Input.module.css'
import imageStyles from '@/shared/components/ui/image.module.css'

export interface ImagePreviewProps {
    url: string
}

export const ImagePreview = ({ url }: ImagePreviewProps) => (
    <div className={inputStyles.preview}>
        <Image
            alt="Preview"
            className={classNames(imageStyles.img, 'rounded-xl')}
            src={url}
        />
    </div>
)
