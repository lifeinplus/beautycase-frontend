import { vi } from 'vitest'

import { type GalleryPageProps } from '../../components/gallery/GalleryPage'
import { type VideoCardProps } from '../../components/gallery/VideoCard'
import { type AdaptiveNavBarProps } from '../../components/navigation/AdaptiveNavBar'
import { type NavigationButtonProps } from '../../components/navigation/NavigationButton'
import { type DetailsPageProps } from '../../components/pages/DetailsPage'
import { type MobileViewProps } from '../../components/table/MobileView'
import { type TableProps } from '../../components/table/Table'
import { type TableRowProps } from '../../components/table/TableRow'
import { type ImageProps } from '../../components/ui/Image'
import { type DataWrapperProps } from '../../components/DataWrapper'
import { type HeroProps } from '../../components/Hero'
import { type TopPanelProps } from '../../components/TopPanel'
import type { Brand } from '../../features/brands/types'
import type { MakeupBag } from '../../features/makeupBags/types'

export const mockComponents = () => {
    vi.mock('../../components/gallery/GalleryPage', () => ({
        GalleryPage: ({
            title,
            isLoading,
            error,
            mediaContent,
        }: GalleryPageProps) => (
            <div data-testid="mocked-gallery-page">
                <h2>{title}</h2>
                {isLoading && (
                    <div data-testid="mocked-loading">Loading...</div>
                )}
                {error ? <div data-testid="mocked-error">Error</div> : <></>}
                {!isLoading && !error && (
                    <div data-testid="mocked-media-content">{mediaContent}</div>
                )}
            </div>
        ),
    }))

    vi.mock('../../components/gallery/VideoCard', () => ({
        VideoCard: ({ data, path }: VideoCardProps) => (
            <div data-testid={`mocked-video-card-${data._id}`}>
                <h2>{data.title}</h2>
                <div>{path}</div>
            </div>
        ),
    }))

    vi.mock('../../components/navigation/AdaptiveNavBar', () => ({
        AdaptiveNavBar: ({ children }: AdaptiveNavBarProps) => (
            <div data-testid="mocked-nav-bar">{children}</div>
        ),
    }))

    vi.mock('../../components/navigation/NavigationButton', () => ({
        NavigationButton: ({ text, onClick }: NavigationButtonProps) => (
            <button onClick={onClick}>{text}</button>
        ),
    }))

    vi.mock('../../components/pages/DetailsPage', () => ({
        DetailsPage: ({
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
                {isLoading && (
                    <div data-testid="mocked-loading">Loading...</div>
                )}
                {error ? <div data-testid="mocked-error">Error</div> : <></>}
                {title && <h1 data-testid="mocked-title">{title}</h1>}
                {subtitle && <p data-testid="mocked-subtitle">{subtitle}</p>}
                {description && (
                    <div data-testid="mocked-description">{description}</div>
                )}
                <div data-testid="mocked-media-content">{mediaContent}</div>
                <div data-testid="mocked-additional-content">
                    {additionalContent}
                </div>
                <button
                    data-testid="mocked-delete-button"
                    onClick={() => deleteItem('123')}
                >
                    Delete
                </button>
            </div>
        ),
    }))

    vi.mock('../../components/table/MobileView', () => ({
        MobileView: ({
            items,
            getTitle,
            getSubtitle,
            getDate,
            getLink,
        }: MobileViewProps<MakeupBag>) => (
            <div data-testid="mocked-mobile-view">
                {items?.map((item, i) => (
                    <a key={i} href={getLink(item)}>
                        {getTitle && <div>{getTitle(item)}</div>}
                        {getSubtitle && <div>{getSubtitle(item)}</div>}
                        {getDate && <div>{getDate(item)}</div>}
                    </a>
                ))}
            </div>
        ),
    }))

    vi.mock('../../components/table/Table', () => ({
        Table: ({ headers, renderRow, data }: TableProps<MakeupBag>) => {
            return (
                <div>
                    {headers?.map((h, i) => <div key={i}>{h.label}</div>)}
                    {data?.map(renderRow)}
                </div>
            )
        },
    }))

    vi.mock('../../components/table/TableRow', () => ({
        TableRow: ({ cellData }: TableRowProps) => {
            return cellData?.map((cell, i) => <div key={i}>{cell}</div>)
        },
    }))

    vi.mock('../../components/ui/Image', () => ({
        Image: ({ src, alt, className }: ImageProps) => (
            <img
                src={src}
                alt={alt}
                className={className}
                data-testid="mocked-image"
            />
        ),
    }))

    vi.mock('../../components/DataWrapper', () => ({
        DataWrapper: ({ children }: DataWrapperProps<Brand>) => (
            <div data-testid="mocked-data-wrapper">{children}</div>
        ),
    }))

    vi.mock('../../components/Header', () => ({
        Header: () => <div data-testid="mocked-header" />,
    }))

    vi.mock('../../components/Hero', () => ({
        Hero: ({ headline }: HeroProps) => (
            <div data-testid="mocked-hero">{headline}</div>
        ),
    }))

    vi.mock('../../components/Spinner', () => ({
        Spinner: () => <div data-testid="mocked-spinner" />,
    }))

    vi.mock('../../components/TopPanel', () => ({
        TopPanel: ({ title, onBack }: TopPanelProps) => (
            <div data-testid="mocked-top-panel">
                <button data-testid="mocked-back-button" onClick={onBack}>
                    Back
                </button>
                <h2>{title}</h2>
            </div>
        ),
    }))
}
