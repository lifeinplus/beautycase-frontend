import { Image } from '../../../components'

interface ImagePreviewProps {
    url: string
}

export const ImagePreview = ({ url }: ImagePreviewProps) => (
    <div className="form-preview">
        <Image alt="Preview" className="img rounded-xl" src={url} />
    </div>
)
