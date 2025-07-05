import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import { mockLessons } from '../../__mocks__/lessonsApi'
import { useGetAllLessonsQuery } from '../../lessonsApi'
import { LessonsGalleryPage } from '../LessonsGalleryPage'

vi.mock('../../../../shared/components/gallery/GalleryPage')
vi.mock('../../../../shared/components/gallery/VideoCard')
vi.mock('../../lessonsApi')

describe('LessonsGalleryPage', () => {
    beforeEach(() => {
        vi.mocked(useGetAllLessonsQuery as Mock).mockReturnValue({
            data: mockLessons,
            isLoading: false,
            error: null,
        })
    })

    it('renders list of lessons when data is available', () => {
        render(<LessonsGalleryPage />)

        expect(screen.getByTestId('mocked-gallery-page')).toBeInTheDocument()
        expect(screen.getByText('titles.gallery')).toBeInTheDocument()
        expect(screen.getByTestId('mocked-media-content')).toBeInTheDocument()

        mockLessons.forEach((lesson) => {
            expect(
                screen.getByTestId(`mocked-video-card-${lesson._id}`)
            ).toBeInTheDocument()

            expect(screen.getByText(lesson.title)).toBeInTheDocument()

            expect(
                screen.getByText(`/lessons/${lesson._id}`)
            ).toBeInTheDocument()
        })
    })
})
