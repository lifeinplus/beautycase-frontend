import { screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { VideoCard } from '../VideoCard'
import { renderWithRouter } from '../../../tests/mocks/wrappers'

vi.mock('../../../utils/youtube', () => ({
    getYouTubeThumbnail: vi.fn(
        (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    ),
}))

describe('VideoCard', () => {
    const mockVideo = {
        title: 'Makeup Tutorial',
        shortDescription: 'Learn how to apply makeup professionally.',
        videoUrl: 'abc123',
    }

    const mockPath = '/videos/1'

    it('renders the video title and description', () => {
        renderWithRouter(<VideoCard data={mockVideo} path={mockPath} />)

        const title = screen.getByText(mockVideo.title)
        const shortDescription = screen.getByText(mockVideo.shortDescription)

        expect(title).toBeInTheDocument()
        expect(shortDescription).toBeInTheDocument()
    })

    it('renders the video thumbnail correctly', () => {
        renderWithRouter(<VideoCard data={mockVideo} path={mockPath} />)

        const image = screen.getByRole('img')

        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('alt', `${mockVideo.title} Thumbnail`)
        expect(image).toHaveAttribute(
            'src',
            `https://img.youtube.com/vi/${mockVideo.videoUrl}/hqdefault.jpg`
        )
    })

    it('renders a link to the correct path', () => {
        renderWithRouter(<VideoCard data={mockVideo} path={mockPath} />)

        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', mockPath)
        expect(link).toHaveClass('lesson-card')
    })

    it('applies correct CSS classes to elements', () => {
        renderWithRouter(<VideoCard data={mockVideo} path={mockPath} />)

        const container = screen.getByRole('img').parentElement
        expect(container).toHaveClass('lesson-card-thumbnail-container')

        const metadata = screen.getByText(mockVideo.title).parentElement
        expect(metadata).toHaveClass('lesson-card-metadata')

        const headline = screen.getByText(mockVideo.title)
        expect(headline).toHaveClass('lesson-card-headline')

        const byline = screen.getByText(mockVideo.shortDescription)
        expect(byline).toHaveClass('lesson-card-byline')
    })
})
