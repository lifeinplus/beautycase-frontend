import { describe, expect, it, vi } from 'vitest'

import { getYouTubeEmbedUrl, getYouTubeThumbnail } from '../youtube'

describe('getYouTubeEmbedUrl', () => {
    it('extracts YouTube video ID correctly', () => {
        const urls = [
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'https://youtu.be/dQw4w9WgXcQ',
            'https://www.youtube.com/embed/dQw4w9WgXcQ',
            'https://www.youtube.com/v/dQw4w9WgXcQ',
            'https://www.youtube.com/e/dQw4w9WgXcQ',
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s',
        ]

        urls.forEach((url) => {
            expect(getYouTubeEmbedUrl(url)).toBe(
                'https://www.youtube.com/embed/dQw4w9WgXcQ'
            )
        })
    })

    it('returns undefined for invalid URL', () => {
        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        expect(getYouTubeEmbedUrl('invalid-url')).toBeUndefined()

        mockConsoleError.mockRestore()
    })
})

describe('getYouTubeThumbnail', () => {
    it('returns a valid YouTube thumbnail URL', () => {
        const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        expect(getYouTubeThumbnail(url)).toBe(
            'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
        )
    })

    it('returns default thumbnail for invalid URL', () => {
        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        expect(getYouTubeThumbnail('invalid-url')).toBe(
            import.meta.env.VITE_DEFAULT_THUMBNAIL_URL
        )

        mockConsoleError.mockRestore()
    })
})
