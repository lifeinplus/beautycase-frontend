import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'

import { mockYouTubeUrl } from '@/tests/mocks/form'
import { mockNavigate } from '@/tests/mocks/router'
import { getYouTubeEmbedUrl } from '@/shared/utils/youtube'
import { mockLesson1 } from '../../../features/lessons/__mocks__/lessonsApi'
import {
    useDeleteLessonByIdMutation,
    useGetLessonByIdQuery,
} from '../../../features/lessons/lessonsApi'
import { LessonDetailsPage } from '../LessonDetailsPage'

vi.mock('@/features/lessons/lessonsApi')
vi.mock('@/shared/components/ui/Image')
vi.mock('@/shared/utils/youtube')
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

        const title = screen.getByText(mockLesson1.title)
        const subtitle = screen.getByText(mockLesson1.shortDescription)
        const description = screen.getByText(mockLesson1.fullDescription)

        expect(title).toBeInTheDocument()
        expect(subtitle).toBeInTheDocument()
        expect(description).toBeInTheDocument()
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
