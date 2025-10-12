import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { renderWithRouter } from '@/tests/mocks/wrappers'
import { VideoCard } from './VideoCard'

vi.mock('@/shared/utils/youtube/thumbnail/getThumbnail')

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

        const image = screen.getByRole('img')

        expect(image).toHaveAttribute('alt', `${mockVideo.title} Thumbnail`)

        expect(image).toHaveAttribute(
            'src',
            `https://img.youtube.com/vi/${mockVideo.videoUrl}/hqdefault.jpg`
        )
    })

    it('renders a link to the correct path', () => {
        renderWithRouter(<VideoCard data={mockVideo} path={mockPath} />)
        expect(screen.getByRole('link')).toHaveAttribute('href', mockPath)
    })
})
