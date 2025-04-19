import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'

import { mockUrlYouTube } from '../../../../tests/mocks/form'
import { mockLesson } from '../../../../tests/mocks/handlers/lessonsHandlers'
import { mockNavigate } from '../../../../tests/mocks/router'
import { getYouTubeEmbedUrl } from '../../../../utils/youtube'
import {
    useDeleteLessonMutation,
    useGetLessonByIdQuery,
} from '../../lessonsApiSlice'
import { LessonDetailsPage } from '../LessonDetailsPage'

vi.mock('../../../../components/pages/DetailsPage')

vi.mock('../../../../utils/youtube', async () => ({
    getYouTubeEmbedUrl: vi.fn(),
}))

vi.mock('../../lessonsApiSlice', () => ({
    useDeleteLessonMutation: vi.fn(),
    useGetLessonByIdQuery: vi.fn(),
}))

describe('LessonDetailsPage', () => {
    const mockDeleteLesson = vi.fn()

    beforeEach(() => {
        vi.mocked(useGetLessonByIdQuery as Mock).mockReturnValue({
            data: mockLesson,
            isLoading: false,
            error: null,
        })

        vi.mocked(useDeleteLessonMutation as Mock).mockReturnValue([
            mockDeleteLesson,
        ])

        vi.mocked(getYouTubeEmbedUrl).mockReturnValue(mockUrlYouTube)
    })

    it('renders lesson details', async () => {
        render(<LessonDetailsPage />)

        const title = screen.getByText(mockLesson.title)
        const shortDesc = screen.getByText(mockLesson.shortDescription)
        const fullDesc = screen.getByText(mockLesson.fullDescription)

        expect(title).toBeInTheDocument()
        expect(shortDesc).toBeInTheDocument()
        expect(fullDesc).toBeInTheDocument()
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
