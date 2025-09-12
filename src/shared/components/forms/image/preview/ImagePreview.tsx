import classNames from 'classnames'

import { Image } from '@/shared/components/ui/image/Image'
import imageStyles from '@/shared/components/ui/image/Image.module.css'
import inputStyles from '@/shared/components/ui/input/Input.module.css'

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
