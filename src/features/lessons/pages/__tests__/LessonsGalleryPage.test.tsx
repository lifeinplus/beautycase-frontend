import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import { mockLessons } from '../../../../tests/mocks/handlers/lessonsHandlers'
import { mockComponents } from '../../../../tests/mocks/components'
import { useGetLessonsQuery } from '../../lessonsApiSlice'
import { LessonsGalleryPage } from '../LessonsGalleryPage'

mockComponents()

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

        expect(screen.getByTestId('mocked-gallery-page')).toBeInTheDocument()
        expect(screen.getByText('Уроки')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-media-content')).toBeInTheDocument()

        mockLessons.forEach((lesson) => {
            const videoCard = screen.getByTestId(
                `mocked-video-card-${lesson._id}`
            )
            const title = screen.getByText(lesson.title)
            const path = screen.getByText(`/lessons/${lesson._id}`)

            expect(videoCard).toBeInTheDocument()
            expect(title).toBeInTheDocument()
            expect(path).toBeInTheDocument()
        })
    })
})
