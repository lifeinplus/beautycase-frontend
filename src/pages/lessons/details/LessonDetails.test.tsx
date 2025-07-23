import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockLesson1 } from '@/features/lessons/__mocks__/lessonsApi'
import {
    useDeleteLessonByIdMutation,
    useGetLessonByIdQuery,
} from '@/features/lessons/lessonsApi'
import { getYouTubeEmbedUrl } from '@/shared/utils/youtube'
import { mockYouTubeUrl } from '@/tests/mocks/form'
import { LessonDetails } from './LessonDetails'

vi.mock('@/features/lessons/lessonsApi')
vi.mock('@/shared/components/ui/Image')
vi.mock('@/shared/utils/youtube')
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

        vi.mocked(getYouTubeEmbedUrl).mockReturnValue(mockYouTubeUrl)
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
})
