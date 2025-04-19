import { type ImagePreviewProps } from '../ImagePreview'

export const ImagePreview = ({ url }: ImagePreviewProps) => (
    <img data-testid="mocked-image-preview" src={url} />
)
