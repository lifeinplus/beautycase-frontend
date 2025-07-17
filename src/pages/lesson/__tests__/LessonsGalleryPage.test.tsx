import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockLessons } from '@/features/lessons/__mocks__/lessonsApi'
import { useGetAllLessonsQuery } from '@/features/lessons/lessonsApi'
import { LessonsGalleryPage } from '../LessonsGalleryPage'

vi.mock('@/features/lessons/lessonsApi')
vi.mock('@/shared/components/gallery/VideoCard')
vi.mock('@/widgets/view/gallery/Gallery')

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
