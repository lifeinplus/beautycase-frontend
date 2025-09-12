import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockLesson1 } from '@/features/lessons/api/__mocks__/lessonsApi'
import {
    useDeleteLessonByIdMutation,
    useGetLessonByIdQuery,
} from '@/features/lessons/api/lessonsApi'
import { getEmbedUrl } from '@/shared/utils/youtube/getEmbedUrl'
import { mockYouTubeUrl } from '@/tests/mocks/form'
import { LessonDetails } from './LessonDetails'

vi.mock('@/features/lessons/api/lessonsApi')
vi.mock('@/shared/components/ui/image/Image')
vi.mock('@/shared/utils/youtube/getEmbedUrl')
vi.mock('@/widgets/product/product-images/ProductImages')
vi.mock('@/widgets/view/details/Details')

describe('LessonDetails', () => {
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
        render(<LessonDetails />)

        expect(screen.getByText(mockLesson1.title)).toBeInTheDocument()

        expect(
            screen.getByText(mockLesson1.shortDescription)
        ).toBeInTheDocument()

        expect(
            screen.getByText(mockLesson1.fullDescription)
        ).toBeInTheDocument()
    })

    it('renders product images', async () => {
        render(<LessonDetails />)
        expect(screen.getByTestId('mocked-product-images')).toBeInTheDocument()
    })

    it('renders default thumbnail', async () => {
        const { videoUrl, ...restLesson } = mockLesson1

        vi.mocked(useGetLessonByIdQuery as Mock).mockReturnValue({
            data: restLesson,
            isLoading: false,
            error: null,
        })

        render(<LessonDetails />)

        expect(screen.getByTestId('mocked-image')).toBeInTheDocument()
    })
})
