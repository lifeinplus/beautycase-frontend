import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockLessons } from '@/features/lessons/api/__mocks__/lessonsApi'
import { useGetAllLessonsQuery } from '@/features/lessons/api/lessonsApi'
import { LessonGallery } from './LessonGallery'

vi.mock('@/features/lessons/api/lessonsApi')
vi.mock('@/shared/components/gallery/video-card/VideoCard')
vi.mock('@/widgets/view/gallery/Gallery')

describe('LessonGallery', () => {
    beforeEach(() => {
        vi.mocked(useGetAllLessonsQuery as Mock).mockReturnValue({
            data: mockLessons,
            isLoading: false,
            error: null,
        })
    })

    it('renders list of lessons when data is available', () => {
        render(<LessonGallery />)

        expect(screen.getByTestId('mocked-gallery-page')).toBeInTheDocument()
        expect(screen.getByText(/titles.gallery/i)).toBeInTheDocument()
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
