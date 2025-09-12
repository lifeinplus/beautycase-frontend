import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithRouter } from '@/tests/mocks/wrappers'
import { VideoCard } from './VideoCard'

vi.mock('@/shared/utils/youtube/getThumbnail')
vi.mock('../../ui/image/Image')

describe('VideoCard', () => {
    const mockVideo = {
        title: 'Makeup Tutorial',
        shortDescription: 'Learn how to apply makeup professionally.',
        videoUrl: 'abc123',
    }

    const mockPath = '/videos/1'

    it('renders the video title and description', () => {
        renderWithRouter(<VideoCard data={mockVideo} path={mockPath} />)

        expect(screen.getByText(mockVideo.title)).toBeInTheDocument()
        expect(screen.getByText(mockVideo.shortDescription)).toBeInTheDocument()
    })

    it('renders the video thumbnail correctly', () => {
        renderWithRouter(<VideoCard data={mockVideo} path={mockPath} />)

        const image = screen.getByTestId('mocked-image')

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
        expect(link).toHaveClass(/card/)
    })

    it('applies correct CSS classes to elements', () => {
        renderWithRouter(<VideoCard data={mockVideo} path={mockPath} />)

        const parentThumbnail = screen.getByTestId('mocked-image').parentElement
        expect(parentThumbnail).toHaveClass(/thumbnail/)

        const parentTitle = screen.getByText(mockVideo.title).parentElement
        expect(parentTitle).toHaveClass(/metadata/)

        expect(screen.getByText(mockVideo.title)).toHaveClass(/headline/)

        expect(screen.getByText(mockVideo.shortDescription)).toHaveClass(
            /byline/
        )
    })
})
