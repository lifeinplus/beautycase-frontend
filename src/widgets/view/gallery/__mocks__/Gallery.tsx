import { GalleryProps } from '../Gallery'

export const Gallery = ({
    title,
    isLoading,
    error,
    mediaContent,
}: GalleryProps) => (
    <div data-testid="mocked-gallery-page">
        <h2>{title}</h2>
        {isLoading && <div data-testid="mocked-loading">Loading...</div>}
        {error ? <div data-testid="mocked-error">Error</div> : <></>}
        {!isLoading && !error && (
            <div data-testid="mocked-media-content">{mediaContent}</div>
        )}
    </div>
)
