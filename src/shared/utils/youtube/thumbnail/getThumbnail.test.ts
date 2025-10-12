import { describe, expect, it, vi } from 'vitest'

import { getThumbnail } from './getThumbnail'

describe('getYouTubeThumbnail', () => {
    it('returns a valid YouTube thumbnail URL', () => {
        const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        expect(getThumbnail(url)).toBe(
            'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
        )
    })

    it('returns default thumbnail for invalid URL', () => {
        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        expect(getThumbnail('invalid-url')).toBe(
            import.meta.env.VITE_DEFAULT_THUMBNAIL_URL
        )

        mockConsoleError.mockRestore()
    })
})
