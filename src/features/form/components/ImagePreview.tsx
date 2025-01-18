interface ImagePreviewProps {
    url: string
}

const defaultPreview = import.meta.env.VITE_DEFAULT_THUMBNAIL_URL

export const ImagePreview = ({ url }: ImagePreviewProps) => (
    <div className="form-preview-container">
        <img
            src={url}
            alt="Preview"
            className="form-preview"
            onError={(e) => {
                e.currentTarget.src = defaultPreview
                e.currentTarget.alt = 'Default Preview'
            }}
        />
    </div>
)
