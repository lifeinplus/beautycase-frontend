import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { type DetailsPageProps } from '../../../../components/pages/DetailsPage'
import { type ImageProps } from '../../../../components/ui/Image'
import { mockUrlYouTube } from '../../../../tests/mocks/form'
import { mockLesson } from '../../../../tests/mocks/handlers/lessonsHandlers'
import { mockNavigate } from '../../../../tests/mocks/router'
import { getYouTubeEmbedUrl } from '../../../../utils/youtube'
import {
    useDeleteLessonMutation,
    useGetLessonByIdQuery,
} from '../../lessonsApiSlice'
import { LessonDetailsPage } from '../LessonDetailsPage'

vi.mock('../../../../components/pages/DetailsPage', () => ({
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
            {isLoading && <div data-testid="mocked-loading">Loading...</div>}
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

vi.mock('../../../../components/ui/Image', () => ({
    Image: ({ src, alt, className }: ImageProps) => (
        <img
            src={src}
            alt={alt}
            className={className}
            data-testid="mocked-mocked-image"
        />
    ),
}))

vi.mock('../../../../utils/youtube', async () => ({
    getYouTubeEmbedUrl: vi.fn(),
}))

vi.mock('../../lessonsApiSlice', () => ({
    useDeleteLessonMutation: vi.fn(),
    useGetLessonByIdQuery: vi.fn(),
}))

describe('LessonDetailsPage', () => {
    const mockDeleteLesson = vi.fn()

    beforeEach(() => {
        vi.mocked(useGetLessonByIdQuery as Mock).mockReturnValue({
            data: mockLesson,
            isLoading: false,
            error: null,
        })

        vi.mocked(useDeleteLessonMutation as Mock).mockReturnValue([
            mockDeleteLesson,
        ])

        vi.mocked(getYouTubeEmbedUrl).mockReturnValue(mockUrlYouTube)
    })

    it('renders lesson details', async () => {
        render(<LessonDetailsPage />)

        const title = screen.getByText(mockLesson.title)
        const shortDesc = screen.getByText(mockLesson.shortDescription)
        const fullDesc = screen.getByText(mockLesson.fullDescription)

        expect(title).toBeInTheDocument()
        expect(shortDesc).toBeInTheDocument()
        expect(fullDesc).toBeInTheDocument()
    })

    it('navigates to product details when product is clicked', async () => {
        const user = userEvent.setup()

        const { container } = render(<LessonDetailsPage />)
        const imgContainer = container.querySelector('.img-container')

        expect(imgContainer).not.toBeNull()

        await user.click(imgContainer as HTMLElement)

        expect(mockNavigate).toHaveBeenCalledWith('/products/product-1', {
            state: { fromPathname: '/test-pathname' },
        })
    })

    it('renders lesson details with thumbnail when no video URL is available', () => {
        vi.mocked(getYouTubeEmbedUrl as Mock).mockReturnValue(null)

        render(<LessonDetailsPage />)

        const image = screen.getByRole('img', { name: /product/i })

        expect(image).toBeInTheDocument()
        expect(image.getAttribute('alt')).toBe('Product 1')
    })
})
