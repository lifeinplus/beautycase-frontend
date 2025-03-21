import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { VideoCard } from '../VideoCard'
import { getYouTubeThumbnail } from '../../../utils'
import { Image } from '../../../components'

// Mock `getYouTubeThumbnail`
vi.mock('../../utils', () => ({
    getYouTubeThumbnail: vi.fn(
        (url) => `https://img.youtube.com/vi/${url}/hqdefault.jpg`
    ),
}))

// Mock `Image` component
vi.mock('../../components', () => ({
    Image: ({ alt, src }: { alt?: string; src?: string }) => (
        <img data-testid="mock-image" alt={alt} src={src} />
    ),
}))

describe('VideoCard component', () => {
    const mockVideo = {
        title: 'Makeup Tutorial',
        shortDescription: 'Learn how to apply makeup professionally.',
        videoUrl: 'abc123',
    }

    const path = '/videos/1'

    it('renders the video title and description', () => {
        render(
            <MemoryRouter>
                <VideoCard data={mockVideo} path={path} />
            </MemoryRouter>
        )

        expect(screen.getByText('Makeup Tutorial')).toBeInTheDocument()
        expect(
            screen.getByText('Learn how to apply makeup professionally.')
        ).toBeInTheDocument()
    })

    // it('renders the video thumbnail correctly', () => {
    //     render(
    //         <MemoryRouter>
    //             <VideoCard data={mockVideo} path={path} />
    //         </MemoryRouter>
    //     )

    //     const image = screen.getByTestId('mock-image')
    //     expect(image).toBeInTheDocument()
    //     expect(image).toHaveAttribute(
    //         'src',
    //         'https://img.youtube.com/vi/abc123/hqdefault.jpg'
    //     )
    //     expect(image).toHaveAttribute('alt', 'Makeup Tutorial Thumbnail')
    // })

    // it('renders a link to the correct path', () => {
    //     render(
    //         <MemoryRouter>
    //             <VideoCard data={mockVideo} path={path} />
    //         </MemoryRouter>
    //     )

    //     const link = screen.getByRole('link')
    //     expect(link).toHaveAttribute('href', path)
    // })
})
