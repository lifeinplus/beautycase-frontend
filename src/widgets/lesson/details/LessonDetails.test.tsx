import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockLesson1 } from '@/features/lessons/api/__mocks__/lessonsApi'
import {
    useDeleteLessonByIdMutation,
    useGetLessonByIdQuery,
} from '@/features/lessons/api/lessonsApi'
import { getEmbedUrl } from '@/shared/utils/youtube/embed-url/getEmbedUrl'
import { mockYouTubeUrl } from '@/tests/mocks/form'
import { renderWithProviderAndRouter } from '@/tests/mocks/wrappers'
import { LessonDetails } from './LessonDetails'

vi.mock('@/features/lessons/api/lessonsApi')
vi.mock('@/shared/utils/youtube/embed-url/getEmbedUrl')
// vi.mock('@/widgets/product/images/ProductImages')
vi.mock('./hooks/useLessonDetailsActions')

describe('LessonDetails', () => {
    const mockOnBack = () => {}
    const mockDeleteLesson = vi.fn()

    beforeEach(() => {
        vi.mocked(useGetLessonByIdQuery as Mock).mockReturnValue({
            data: mockLesson1,
            isLoading: false,
            error: null,
        })

        vi.mocked(useDeleteLessonByIdMutation as Mock).mockReturnValue([
            mockDeleteLesson,
        ])

        vi.mocked(getEmbedUrl).mockReturnValue(mockYouTubeUrl)
    })

    it('renders lesson details', async () => {
        renderWithProviderAndRouter(<LessonDetails onBack={mockOnBack} />)

        expect(screen.getAllByText(mockLesson1.title)).toHaveLength(2)

        expect(screen.getAllByText(mockLesson1.shortDescription)).toHaveLength(
            2
        )

        expect(
            screen.getByText(mockLesson1.fullDescription)
        ).toBeInTheDocument()
    })

    it('renders default thumbnail', async () => {
        const { videoUrl, ...restLesson } = mockLesson1

        vi.mocked(useGetLessonByIdQuery as Mock).mockReturnValue({
            data: restLesson,
            isLoading: false,
            error: null,
        })

        renderWithProviderAndRouter(<LessonDetails onBack={mockOnBack} />)

        expect(screen.getAllByRole('img')[0]).toBeInTheDocument()
    })
})
