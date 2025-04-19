import { type DetailsPageProps } from '../DetailsPage'

export const DetailsPage = ({
    isLoading,
    error,
    title,
    subtitle,
    description,
    mediaContent,
    additionalContent,
    deleteItem,
}: DetailsPageProps) => (
    <div data-testid="mocked-details-page">
        {isLoading && <div data-testid="mocked-loading">Loading...</div>}
        {error ? <div data-testid="mocked-error">Error</div> : <></>}
        {title && <h1 data-testid="mocked-title">{title}</h1>}
        {subtitle && <p data-testid="mocked-subtitle">{subtitle}</p>}
        {description && (
            <div data-testid="mocked-description">{description}</div>
        )}
        <div data-testid="mocked-media-content">{mediaContent}</div>
        <div data-testid="mocked-additional-content">{additionalContent}</div>
        <button
            data-testid="mocked-delete-button"
            onClick={() => deleteItem('123')}
        >
            Delete
        </button>
    </div>
)
