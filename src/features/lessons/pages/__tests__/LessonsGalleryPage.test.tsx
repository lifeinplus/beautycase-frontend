import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import { type GalleryPageProps } from '../../../../components/gallery/GalleryPage'
import { type VideoCardProps } from '../../../../components/gallery/VideoCard'
import { mockLessons } from '../../../../tests/mocks/handlers/lessonsHandlers'
import { useGetLessonsQuery } from '../../lessonsApiSlice'
import { LessonsGalleryPage } from '../LessonsGalleryPage'

vi.mock('../../../../components/gallery/GalleryPage', () => ({
    GalleryPage: ({
        title,
        isLoading,
        error,
        mediaContent,
    }: GalleryPageProps) => (
        <div data-testid="gallery-page">
            <h2>{title}</h2>
            {isLoading && <div data-testid="loading">Loading...</div>}
            {error ? <div data-testid="error">Error</div> : <></>}
            {!isLoading && !error && (
                <div data-testid="media-content">{mediaContent}</div>
            )}
        </div>
    ),
}))

vi.mock('../../../../components/gallery/VideoCard', () => ({
    VideoCard: ({ data, path }: VideoCardProps) => (
        <div data-testid={`video-card-${data._id}`}>
            <h2>{data.title}</h2>
            <div>{path}</div>
        </div>
    ),
}))

vi.mock('../../lessonsApiSlice', () => ({
    useGetLessonsQuery: vi.fn(),
}))

describe('LessonsGalleryPage', () => {
    beforeEach(() => {
        vi.mocked(useGetLessonsQuery as Mock).mockReturnValue({
            data: mockLessons,
            isLoading: false,
            error: null,
        })
    })

    it('renders list of lessons when data is available', () => {
        render(<LessonsGalleryPage />)

        expect(screen.getByTestId('gallery-page')).toBeInTheDocument()
        expect(screen.getByText('Уроки')).toBeInTheDocument()
        expect(screen.getByTestId('media-content')).toBeInTheDocument()

        mockLessons.forEach((lesson) => {
            const videoCard = screen.getByTestId(`video-card-${lesson._id}`)
            const title = screen.getByText(lesson.title)
            const path = screen.getByText(`/lessons/${lesson._id}`)

            expect(videoCard).toBeInTheDocument()
            expect(title).toBeInTheDocument()
            expect(path).toBeInTheDocument()
        })
    })
})
