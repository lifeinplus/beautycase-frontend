import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockLesson1 } from '@/features/lessons/__mocks__/lessonsApi'
import {
    useDeleteLessonByIdMutation,
    useGetLessonByIdQuery,
} from '@/features/lessons/lessonsApi'
import { getYouTubeEmbedUrl } from '@/shared/utils/youtube'
import { mockYouTubeUrl } from '@/tests/mocks/form'
import { mockNavigate } from '@/tests/mocks/router'
import { LessonDetailsPage } from '../LessonDetailsPage'

vi.mock('@/features/lessons/lessonsApi')
vi.mock('@/shared/components/ui/Image')
vi.mock('@/shared/utils/youtube')
vi.mock('@/widgets/product/SelectProductsTile')
vi.mock('@/widgets/DetailsPage')

describe('LessonDetailsPage', () => {
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
        render(<LessonDetailsPage />)

        expect(screen.getByText(mockLesson1.title)).toBeInTheDocument()

        expect(
            screen.getByText(mockLesson1.shortDescription)
        ).toBeInTheDocument()

        expect(
            screen.getByText(mockLesson1.fullDescription)
        ).toBeInTheDocument()
    })

    it('navigates to product details when product is clicked', async () => {
        const user = userEvent.setup()

        render(<LessonDetailsPage />)

        const additionalContent = screen.getByTestId(
            'mocked-additional-content'
        )

        const container = additionalContent.querySelector(
            "[class*='container'][class*='square']"
        )

        expect(container).not.toBeNull()

        await user.click(container as HTMLElement)

        expect(mockNavigate).toHaveBeenCalledWith('/products/product-1', {
            state: { fromPathname: '/test-pathname' },
        })
    })

    it('renders lesson details with thumbnail when no video URL is available', () => {
        vi.mocked(getYouTubeEmbedUrl as Mock).mockReturnValue(null)

        render(<LessonDetailsPage />)

        expect(
            screen.getByRole('img', { name: /product/i }).getAttribute('alt')
        ).toBe('Product 1')
    })
})
