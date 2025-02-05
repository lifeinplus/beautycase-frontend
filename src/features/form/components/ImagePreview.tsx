import config from '../../../config'

interface ImagePreviewProps {
    url: string
}

export const ImagePreview = ({ url }: ImagePreviewProps) => (
    <div className="form-preview-container">
        <img
            alt="Preview"
            className="form-preview"
            onError={(e) => {
                e.currentTarget.src = config.cloudinary.defaultThumbnailUrl
                e.currentTarget.alt = 'Default Preview'
            }}
            src={url}
        />
    </div>
)
