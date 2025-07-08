import { Image } from '@/shared/components/ui/Image'
import inputStyles from '@/shared/components/ui/Input.module.css'

export interface ImagePreviewProps {
    url: string
}

export const ImagePreview = ({ url }: ImagePreviewProps) => (
    <div className={inputStyles.preview}>
        <Image alt="Preview" className="img rounded-xl" src={url} />
    </div>
)
